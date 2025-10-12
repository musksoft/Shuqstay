import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';
import InputField from '../ui/inputfield';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'tenant',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (signInError || !data.user) {
      setError('❌ Invalid credentials');
      return;
    }

    let table = 'tenants';
    if (formData.role === 'landlord') table = 'landlords';
    else if (formData.role === 'admin') table = 'admins';

    const { data: profile, error: profileError } = await supabase
      .from(table)
      .select('*')
      .eq('email', formData.email)
      .single();

    if (profileError || !profile) {
      setError('❌ Profile not found for this role');
      console.error(profileError);
      return;
    }

    localStorage.setItem(
      'user',
      JSON.stringify({
        id: data.user.id,
        email: data.user.email,
        name: profile.name,
        role: formData.role,
        profileId: profile.id,
        civil_id: profile.civil_id,
        phone: profile.phone,
        age: profile.age,
        nationality: profile.nationality,
        status: profile.status,
      })
    );

    // Navigate based on role
    if (formData.role === 'admin') navigate('/adminpanel');
    else if (formData.role === 'landlord') navigate('/landlordadmin');
    else navigate('/tenantpanel');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white text-black shadow rounded">
      <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />
      <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
      <InputField
        label="Role"
        name="role"
        type="select"
        options={['tenant', 'landlord', 'admin']}
        value={formData.role}
        onChange={handleChange}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button type="submit" className="w-full bg-brown text-white py-2 rounded">
        Login
      </button>
    </form>
  );
}
