import React from 'react';

export default function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  options = [],
}) {
  const id = `input-${name}`; // Unique ID for each field

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>

      {type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
