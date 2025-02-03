import React from 'react';

export function AcademicYearDropdown({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Current Academic Year
      </label>
      <select
        name="academicYear"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-lg bg-white"
        required
      >
        <option value="">Select academic year</option>
        <option value="Year 12">Year 12</option>
        <option value="Year 13">Year 13</option>
        <option value="Gap Year">Gap Year</option>
        <option value="University Freshman">University Freshman</option>
      </select>
    </div>
  );
}