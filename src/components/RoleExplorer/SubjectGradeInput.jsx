import React from 'react';
import { Button } from './Button';

export const SubjectGradeInput = ({ pairs, onAdd, onChange, onRemove }) => {
  return (
    <div className="space-y-4">
      {pairs.map((pair, index) => (
        <div key={index} className="flex gap-4 items-start">
          <input
            type="text"
            placeholder="Subject"
            value={pair.subject}
            onChange={(e) => onChange(index, 'subject', e.target.value)}
            className="flex-1 p-2 border rounded-lg box-border"
            required
          />
          <input
            type="text"
            placeholder="Grade"
            value={pair.grade}
            onChange={(e) => onChange(index, 'grade', e.target.value)}
            className="flex-1 p-2 border rounded-lg box-border"
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