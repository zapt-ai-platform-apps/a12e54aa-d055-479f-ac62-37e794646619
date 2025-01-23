import React from 'react';

export default function AcademicForm({ academicData, handleAcademicChange, handleSaveRole }) {
  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Academic Information</h3>
      <input
        name="year"
        value={academicData.year}
        onChange={handleAcademicChange}
        placeholder="Current Academic Year"
        className="w-full p-2 border rounded-lg"
      />
      <input
        name="subjects"
        value={academicData.subjects}
        onChange={handleAcademicChange}
        placeholder="Main Subjects Studied"
        className="w-full p-2 border rounded-lg"
      />
      <input
        name="grades"
        value={academicData.grades}
        onChange={handleAcademicChange}
        placeholder="Predicted Grades"
        className="w-full p-2 border rounded-lg"
      />
      <input
        name="location"
        value={academicData.location}
        onChange={handleAcademicChange}
        placeholder="Preferred Location"
        className="w-full p-2 border rounded-lg"
      />
      <button
        onClick={handleSaveRole}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save This Career Path
      </button>
    </div>
  );
}