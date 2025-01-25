import React from 'react';

export const FormField = ({ label, name, value, onChange, placeholder, required }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded-lg"
        required={required}
      />
    </div>
  );
};