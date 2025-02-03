import React from 'react';
import ActionButtons from './RoleContent/ActionButtons';

export default function RoleContent({ role, roleInfo, courses, requiresEducation, onSave, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold mb-6">{role}</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Role Overview</h2>
          <p className="text-gray-600">{roleInfo.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <ul className="list-disc pl-6 text-gray-600">
            {roleInfo.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {requiresEducation ? 'Higher Education Requirements' : 'Training Requirements'}
          </h2>
          <p className="text-gray-600 mb-4">
            {requiresEducation 
              ? 'This role typically requires a university degree. Here are recommended courses:'
              : 'This role typically requires specialized training. Here are recommended programs:'}
          </p>
          
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index} className="p-4 bg-blue-50 rounded-lg">
                <a
                  href={course.course_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  <h3 className="font-semibold">{course.provider_name}</h3>
                  <p>{course.course_title}</p>
                </a>
              </div>
            ))}
          </div>
        </div>

        <ActionButtons onBack={onBack} onSave={onSave} />
      </div>
    </div>
  );
}