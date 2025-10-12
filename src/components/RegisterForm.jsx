import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import InputField from '../ui/inputfield';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    civil_id: '',
    status: '',
    age: '',
    nationality: '',
    role: 'tenant',
    adminCode: '',
  });

  const [errors, setErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = 'Required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.password || formData.password.length < 6)
      errs.password = 'Password must be at least 6 characters';
    if (!formData.civil_id || formData.civil_id.length <12) errs.civil_id = 'Civil ID required';
    if (!formData.age || isNaN(formData.age)) errs.age = 'Valid age required';
    if (!formData.nationality) errs.nationality = 'Required';

    if (formData.role === 'landlord'){
      if (formData.nationality !== 'Kuwaiti'){
        errs.nationality = 'Only Kuwaitis are allowed to rent their property as landlord';
      }
    }

    // Special password check for admin
    if (formData.role === 'admin') {
  if (formData.adminCode !== 'shuqstay@admin') {
    errs.adminCode = 'Invalid admin registration code';
  }
}



    // Terms & conditions check
    if (
      (formData.role === 'tenant' || formData.role === 'landlord') &&
      !acceptedTerms
    ) {
      errs.terms = 'You must accept terms and conditions';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { role: formData.role },
      },
    });

    if (authError) {
      alert(authError.message);
      return;
    }

    // Determine target table
    let table = 'tenants';
    if (formData.role === 'landlord') table = 'landlords';
    else if (formData.role === 'admin') table = 'admins';

    // Insert into role-specific table
    const { error: insertError } = await supabase.from(table).insert({
      id: authData.user.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      civil_id: formData.civil_id,
      status: formData.status,
      age: parseInt(formData.age, 10),
      nationality: formData.nationality,
    });

    if (insertError) {
      alert('Error saving profile: ' + insertError.message);
      return;
    }

    alert('Registration successful! You can now login.');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white text-black shadow rounded"
    >
      <InputField label="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <InputField label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
      <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
      <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
      <InputField label="Civil ID" name="civil_id" value={formData.civil_id} onChange={handleChange} error={errors.civil_id} />
      <InputField label="Status" name="status" value={formData.status} onChange={handleChange} />
      <InputField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} error={errors.age} />
      <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} error={errors.nationality} />
      <InputField label="Role" name="role" type="select" options={['tenant', 'landlord', 'admin']} value={formData.role} onChange={handleChange} />

{formData.role === 'admin' && (
  <InputField
    label="Admin Access Code"
    name="adminCode"
    type="password"
    value={formData.adminCode}
    onChange={handleChange}
    error={errors.adminCode}
  />
)}


      {(formData.role === 'tenant' || formData.role === 'landlord') && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm">
            I agree to the{' '}
            <a href="/terms" className="text-blue-600 underline">
              Terms and Conditions
            </a>
          </label>
        </div>
      )}
      {errors.terms && <p className="text-red-600 text-sm">{errors.terms}</p>}

      <button type="submit" className="w-full bg-brown text-white py-2 rounded">
        Register
      </button>
    </form>
  );
}
