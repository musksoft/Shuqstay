import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { UploadCloud } from 'lucide-react';
import { supabase } from '../config/supabaseClient';


export default function ComplaintBox({ user, role }) {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!description.trim()) {
    toast.error("Please enter a complaint.");
    return;
  }

  setLoading(true);

  try {
    let uploadedFileUrl = null;

    // Upload file if exists
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${user.profileId}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("complaints") // Make sure the "complaints" bucket exists
        .upload(fileName, file);

      if (uploadError) {
        throw new Error("File upload failed.");
      }

      const { publicUrl } = supabase.storage
        .from("complaints")
        .getPublicUrl(fileName);
        
      uploadedFileUrl = publicUrl;
    }

    // Insert complaint into DB
    const { error } = await supabase.from("complaints").insert([
      {
        tenant_id: user.profileId,
        description,
        file_url: uploadedFileUrl,
      },
    ]);

    if (error) {
      throw error;
    }

    toast.success("Complaint submitted!");

    // Reset form
    setDescription('');
    setFile(null);
  } catch (err) {
    console.error(err);
    toast.error("Failed to submit complaint.");
  } finally {
    setLoading(false);
  }
};

    
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-red-700">Raise a Complaint</h2>
      <textarea
        className="w-full p-3 border rounded resize-none h-32 focus:outline-none focus:ring-2 focus:ring-red-300"
        placeholder="Describe your issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <UploadCloud size={18} />
          <span>Attach File (Optional)</span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*,.pdf,.doc,.docx"
          />
        </label>
        {file && <p className="text-sm mt-1 text-gray-700">📎 {file.name}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded transition-all"
      >
        {loading ? "Submitting..." : "Submit Complaint"}
      </button>
    </form>
  );
}
