import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import PropertyCard from "../components/PropertyCard";

const RentalRooms = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      console.log("Fetching properties…");

      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*, landlords(name, phone, email, nationality)")
          .order("created_at", { ascending: false });

        console.log("Supabase response:", { data, error });

        if (error) {
          console.error("Error fetching properties:", error.message);
          setProperties([]);
        } else if (!data) {
          console.warn("No data returned");
          setProperties([]);
        } else {
          const formatted = data.map((property) => ({
            id: property.id,
            title: property.title || "Rental Room",
            location: property.location || "Unknown",
            price: parseFloat(property.price) || 0,
            bedrooms: property.bedrooms || 1,
            bathrooms: property.bathrooms || 1,
            area: property.area || 150,
            amenities: [
              ...(property.building_facilities || []),
              ...(property.inhouse_facilities || []),
            ],
            featured: false,
            image: property.image_urls?.[0] || "",
            description: property.description || "",
            landlord: property.landlords || {},
          }));

          console.log("Formatted properties:", formatted);
          setProperties(formatted);
        }
      } catch (err) {
        console.error("Unexpected fetch failure:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="text-center">Loading properties...</p>;

  if (properties.length === 0) {
    return <p className="text-center text-gray-500">No rental rooms available yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default RentalRooms;
