import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient.js";
import PropertyCard from "./PropertyCard";
import EditPropertyModal from "./EditPropertyModal.jsx";
import { Loader2 } from "lucide-react";

export default function LandlordPropertyList({ landlordId }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState(null);

  useEffect(() => {
    if (!landlordId) return;

    const fetchProperties = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("landlord_id", landlordId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch properties:", error.message);
      } else {
        setProperties(data);
      }

      setLoading(false);
    };

    fetchProperties();
  }, [landlordId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    const { error } = await supabase.from("properties").delete().eq("id", id);

    if (error) {
      alert("Failed to delete property.");
    } else {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleUpdate = async (updatedProperty) => {
    const { id, ...fields } = updatedProperty;

    const { error } = await supabase
      .from("properties")
      .update(fields)
      .eq("id", id);

    if (error) {
      alert("Failed to update property.");
    } else {
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...fields } : p))
      );
      setEditingProperty(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="animate-spin w-6 h-6 text-brown" />
        <span className="ml-2">Loading properties...</span>
      </div>
    );
  }

  if (properties.length === 0) {
    return <p className="text-center text-gray-500">No properties found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={transformProperty(property)}
            canEdit={true}
            onEdit={() => setEditingProperty(property)}
            onDelete={() => handleDelete(property.id)}
          />
        ))}
      </div>

      {editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
}

function transformProperty(property) {
  return {
    id: property.id,
    title: property.title || "Untitled Property",
    location: property.location || "Unknown",
    price: property.price || 0,
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area || 0,
    amenities: [...(property.inhouse_facilities || []), ...(property.building_facilities || [])],
    featured: false,
    image: property.image_urls?.[0] || "https://via.placeholder.com/400?text=No+Image",
    images: property.image_urls || [],
    landlord_id: property.landlord_id,
  };
}
