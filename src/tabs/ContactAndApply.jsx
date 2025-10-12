import React, { useState, useEffect } from "react";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Textarea } from "../ui/textarea.jsx";
import { supabase } from "../config/supabaseClient.js";

export function ContactAndApplyTab({ property }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: `I'm interested in the ${property.title}. Please contact me.`,
  });

  const [landlord, setLandlord] = useState(null);

  useEffect(() => {
    const fetchLandlord = async () => {
      const { data, error } = await supabase
        .from("landlords")
        .select("name, email, phone")
        .eq("id", property.landlord_id)
        .single();

      if (!error && data) {
        setLandlord(data);
      }
    };

    if (property.landlord_id) fetchLandlord();
  }, [property.landlord_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent:\n\n${JSON.stringify(form, null, 2)}`);
    // Optionally post to DB or email API
  };

  return (
    <div className="space-y-6 mt-6">
      {landlord && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Landlord Contact Info</h3>
          <p><strong>Name:</strong> {landlord.name}</p>
          <p><strong>Email:</strong> {landlord.email}</p>
          <p><strong>Phone:</strong> {landlord.phone}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <Input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <Textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          required
        />
        <Button type="submit">Send Inquiry</Button>
      </form>
    </div>
  );
}
