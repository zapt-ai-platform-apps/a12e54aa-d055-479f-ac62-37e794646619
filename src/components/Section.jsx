import React from 'react';

export default function Section({ title, items, loading, type = 'course' }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ) : items.length === 0 ? (
        <p className="text-gray-500">No {title.toLowerCase()} found for this role</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
              {type === 'opportunity' ? (
                <>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:underline text-sm"
                  >
                    View Opportunity →
                  </a>
                </>
              ) : (
                <>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.provider}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Course →
                    </a>
                    {type === 'paid' && (
                      <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded">
                        Paid Course
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}