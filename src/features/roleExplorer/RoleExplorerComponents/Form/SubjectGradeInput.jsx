import React from 'react';
import { Button } from './Button';

export const SubjectGradeInput = ({ pairs, onAdd, onChange, onRemove }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[2fr_2fr_40px] gap-2 items-center">
        <span className="text-sm font-medium text-gray-700">Subject</span>
        <span className="text-sm font-medium text-gray-700">Predicted Grade</span>
        <span></span>
      </div>

      {pairs.map((pair, index) => (
        <div key={index} className="grid grid-cols-[2fr_2fr_40px] gap-2 items-center">
          <input
            type="text"
            placeholder="Subject"
            value={pair.subject}
            onChange={(e) => onChange(index, 'subject', e.target.value)}
            className="w-full p-2 border rounded-lg box-border"
            required
          />
          <input
            type="text"
            placeholder="Grade"
            value={pair.grade}
            onChange={(e) => onChange(index, 'grade', e.target.value)}
            className="w-full p-2 border rounded-lg box-border"
            required
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-700"
            aria-label="Remove subject and grade"
          >
            ×
          </button>
        </div>
      ))}
      
      <Button type="button" onClick={onAdd} variant="secondary">
        Add Subject + Grade
      </Button>
    </div>
  );
};