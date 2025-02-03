import React from 'react';

export const CourseItem = ({ course, isUniversity }) => (
  <a
    href={course.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
  >
    <div className="font-medium">{course.name}</div>
    <div className="text-sm text-gray-600 mt-1">{course.provider}</div>
  </a>
);