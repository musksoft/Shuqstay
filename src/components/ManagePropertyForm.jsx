import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { Plus, Camera } from "lucide-react";

const ManagePropertyForm = ({ landlordId }) => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [buildingFacilities, setBuildingFacilities] = useState([]);
  const [inHouseFacilities, setInHouseFacilities] = useState([]);
  const [title, setTitle] = useState("");
const [location, setLocation] = useState("");
const [bedrooms, setBedrooms] = useState(0);
const [bathrooms, setBathrooms] = useState(0);
const [area, setArea] = useState(0);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const buildingOptions = [
    "Parking",
    "Elevator",
    "Security",
    "Backup Generator",
  ];
  const inHouseOptions = ["AC", "Washing Machine", "WiFi", "Refrigerator"];

  const handleCheckboxChange = (option, isBuilding) => {
    const current = isBuilding ? buildingFacilities : inHouseFacilities;
    const setFunction = isBuilding
      ? setBuildingFacilities
      : setInHouseFacilities;

    setFunction(
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess(false);

    

    if (!landlordId) {
      setErrorMsg(" Missing landlord ID. Please log in again.");
      return;
    }

    if (!description || !price || !type) {
      setErrorMsg(" Please fill in all required fields.");
      return;
    }

    if (images.length === 0) {
      setErrorMsg(" Please upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      const uploadedImageUrls = [];

      for (const file of images) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(filePath, file);

        if (uploadError) {
          console.error(
            ` Upload failed for ${file.name}:`,
            uploadError.message
          );
          throw new Error(`Upload failed for ${file.name}`);
        }

        const {
          data: { publicUrl },
          error: urlError,
        } = supabase.storage.from("property-images").getPublicUrl(filePath);

        if (urlError || !publicUrl) {
          console.error(
            ` Failed to get public URL for ${file.name}:`,
            urlError?.message
          );
          throw new Error(`Public URL generation failed for ${file.name}`);
        }

        uploadedImageUrls.push(publicUrl);
      }

      if (uploadedImageUrls.length === 0) {
        setErrorMsg(" Image upload failed. Please try again.");
        return;
      }

     const { error: insertError } = await supabase.from("properties").insert([{
  landlord_id: landlordId,
  image_urls: uploadedImageUrls,
  description,
  price: parseFloat(price),
  type,
  building_facilities: buildingFacilities,
  inhouse_facilities: inHouseFacilities,
  title,
  location,
  bedrooms,
  bathrooms,
  area,
}]);


      if (insertError) {
        console.error(" Supabase insert error:", insertError.message);
        throw insertError;
      }

      setSuccess(true);
      setErrorMsg("");
      setDescription("");
      setPrice("");
      setType("");
      setImages([]);
      setBuildingFacilities([]);
      setInHouseFacilities([]);
    } catch (err) {
      setErrorMsg(
        ` ${err.message || "Something went wrong. Please try again."}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
   <form
  onSubmit={handleSubmit}
  className="space-y-6 max-w-2xl mx-auto p-4 sm:p-6 bg-brown_lt shadow rounded-xl"
>
  {errorMsg && <p className="text-red-600 font-semibold">{errorMsg}</p>}
  {success && (
    <p className="text-green-700 font-semibold"> Property Added Successfully!</p>
  )}

  {/* Image Upload Section */}
  <div className="w-full flex justify-center">
    <div className="text-center">
      <label className="block font-bold text-[#653511] mb-2">Upload Images</label>

      <div className="bg-[#f9f4f1] w-44 sm:w-52 h-44 rounded-lg flex flex-col items-center justify-center shadow-sm">
        <label
          htmlFor="file-upload"
          className="w-20 h-20 rounded-full border-4 border-dashed border-[#653511] flex items-center justify-center cursor-pointer hover:bg-[#f3e8e1] transition"
        >
          <Plus className="w-8 h-8 text-[#653511]" />
        </label>
        <div className="mt-3">
          <Camera className="text-[#653511]" />
        </div>
      </div>

      <input
        id="file-upload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  </div>

  {/* Description */}
  <div>
    <label className="font-bold text-[#653511]">Description:</label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full p-3 border border-[#653511] bg-[#f9f4f1] rounded-lg"
      required
    />
  </div>

  {/* Rental Price */}
  <div>
    <label className="font-bold text-[#653511]">Rental Price:</label>
    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="w-full p-3 border border-[#653511] bg-[#f9f4f1] rounded-lg"
      required
    />
  </div>

  {/* Type Selection */}
  <div>
    <label className="font-bold text-[#653511]">Type:</label>
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="w-full p-3 border border-[#653511] bg-[#f9f4f1] rounded-lg"
      required
    >
      <option value="">Select Type</option>
      <option value="Fully Furnished">Fully Furnished</option>
      <option value="Partially Furnished">Partially Furnished</option>
      <option value="Unfurnished">Unfurnished</option>
      <option value="Studio">Studio</option>
    </select>
  </div>
   
   {/* Title */}
<div>
  <label className="font-bold text-[#653511]">Title:</label>
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full p-3 border border-[#653511] bg-[#f9f4f1] rounded-lg"
    required
  />
</div>

{/* Location */}
<div>
  <label className="font-bold text-[#653511]">Location:</label>
  <input
    type="text"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="w-full p-3 border border-[#653511] bg-[#f9f4f1] rounded-lg"
    required
  />
</div>

{/* Bedrooms */}
<div>
  <label className="font-bold text-[#653511]">Bedrooms:</label>
  <input
    type="number"
    value={bedrooms}
    onChange={(e) => setBedrooms(parseInt(e.target.value))}
    className="w-full p-3 border border-[#653511] bg-[#f9f4f1] rounded-lg"
    min="0"
    required
  />
</div>

{/* Bathrooms */}
<div>
  <label className="font-bold text-[#653511]">Bathrooms:</label>
  <input
    type="number"
    value={bathrooms}
    onChange={(e) => setBathrooms(parseInt(e.target.value))}
    className="w-full p-3 border border-[#653511] bg-[#f9f4f1] rounded-lg"
    min="0"
    required
  />
</div>

{/* Area */}
<div>
  <label className="font-bold text-[#653511]">Area (sqft):</label>
  <input
    type="number"
    value={area}
    onChange={(e) => setArea(parseInt(e.target.value))}
    className="w-full p-3 border border-[#653511] bg-[#f9f4f1] rounded-lg"
    min="0"
    required
  />
</div>


  {/* Building Facilities */}
  <div>
    <h3 className="font-bold text-[#653511]">🏢 Building Facilities:</h3>
    <div className="flex flex-wrap gap-4 mt-2">
      {buildingOptions.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 text-[#653511]"
        >
          <input
            type="checkbox"
            checked={buildingFacilities.includes(option)}
            onChange={() => handleCheckboxChange(option, true)}
          />
          {option}
        </label>
      ))}
    </div>
  </div>

  {/* In-House Facilities */}
  <div>
    <h3 className="font-bold text-[#653511]">🏠 In-House Facilities:</h3>
    <div className="flex flex-wrap gap-4 mt-2">
      {inHouseOptions.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 text-[#653511]"
        >
          <input
            type="checkbox"
            checked={inHouseFacilities.includes(option)}
            onChange={() => handleCheckboxChange(option, false)}
          />
          {option}
        </label>
      ))}
    </div>
  </div>

  {/* Submit Button */}
  <div className="w-full flex justify-center">
    <button
      type="submit"
      disabled={loading}
      className="bg-[#7a5238] hover:bg-[#5b3f2e] text-white font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto"
    >
      {loading ? "Submitting..." : "Submit Property"}
    </button>
  </div>
</form>

  );
};

export default ManagePropertyForm;
