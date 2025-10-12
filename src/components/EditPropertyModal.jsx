import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog.jsx";
import { Button } from "../ui/button.jsx";

export default function EditPropertyModal({ property, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: property.title || "",
    location: property.location || "",
    price: property.price || 0,
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    area: property.area || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit({ ...property, ...form });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full z-[100]">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border p-2 rounded"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
          />
          <input
            name="bedrooms"
            type="number"
            value={form.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            className="w-full border p-2 rounded"
          />
          <input
            name="bathrooms"
            type="number"
            value={form.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="w-full border p-2 rounded"
          />
          <input
            name="area"
            type="number"
            value={form.area}
            onChange={handleChange}
            placeholder="Area (sqft)"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-brown text-white" onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
