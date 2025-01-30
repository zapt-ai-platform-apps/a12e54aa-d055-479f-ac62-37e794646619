import React from 'react';
import { PathwayButton } from './CustomRoleExplorerUI/PathwayButton';
import { CourseItem } from './CustomRoleExplorerUI/CourseItem';
import { SaveButton } from './CustomRoleExplorerUI/SaveButton';

export default function CustomRoleExplorerUI({ 
  role, 
  data, 
  error, 
  selectedType, 
  setSelectedType, 
  handleSave 
}) {
  const courses = data
    ? selectedType === 'university' 
      ? data.universityCourses 
      : data.apprenticeships
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Career Exploration: {role}</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {data && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <PathwayButton
                type="university"
                label="University Pathway"
                selectedType={selectedType}
                onClick={setSelectedType}
              />
              <PathwayButton
                type="apprenticeships"
                label="Apprenticeship Pathway"
                selectedType={selectedType}
                onClick={setSelectedType}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold">
                {selectedType === 'university' 
                  ? 'Recommended University Courses' 
                  : 'Apprenticeship Programs'}
              </h3>
              
              <div className="space-y-4">
                {courses.length === 0 ? (
                  <div className="text-gray-500">
                    No {selectedType === 'university' ? 'courses' : 'apprenticeships'} found
                  </div>
                ) : courses.map((course, i) => (
                  <CourseItem
                    key={i}
                    course={course}
                    isUniversity={selectedType === 'university'}
                  />
                ))}
              </div>
            </div>

            <SaveButton
              handleSave={handleSave}
              selectedType={selectedType}
              courses={courses}
            />
          </div>
        )}
      </div>
    </div>
  );
}