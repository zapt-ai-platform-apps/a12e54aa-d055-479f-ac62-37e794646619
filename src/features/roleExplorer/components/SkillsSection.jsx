import React from 'react';
import { skillOptions } from "./constants";

export const SkillsSection = ({ selectedSkills, onSkillToggle }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Key Skills
      </label>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {skillOptions.map(skill => (
          <button
            key={skill}
            type="button"
            onClick={() => onSkillToggle(skill)}
            className={`p-2 text-sm rounded-lg border ${
              selectedSkills.includes(skill)
                ? "bg-blue-100 border-blue-500"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
};