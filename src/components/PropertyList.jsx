import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";

const PropertyList = ({ landlordId }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("landlord_id", landlordId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching properties:", error.message);
      } else {
        setProperties(data);
      }

      setLoading(false);
    };

    if (landlordId) {
      fetchProperties();
    }
  }, [landlordId]);

  if (loading) return <p>Loading properties...</p>;

  if (properties.length === 0) {
    return <p className="text-center text-gray-500">No properties listed yet.</p>;
  }

  return (
    <div className="grid gap-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="border rounded-lg p-4 shadow-sm bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {property.image_urls?.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Property ${idx + 1}`}
                  className="h-32 w-32 object-cover rounded border"
                />
              ))}
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-lg font-bold mb-2">{property.type}</h2>
              <p className="text-gray-700 mb-2">{property.description}</p>
              <p className="text-green-700 font-semibold mb-2">
                💰 ${property.price}
              </p>

              <div className="text-sm text-gray-600">
                <p>
                  🏢 <strong>Building Facilities:</strong>{" "}
                  {property.building_facilities?.join(", ") || "None"}
                </p>
                <p>
                  🏠 <strong>In-House Facilities:</strong>{" "}
                  {property.inhouse_facilities?.join(", ") || "None"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
