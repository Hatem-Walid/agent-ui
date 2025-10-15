import React from "react";

const ScanResults = ({ results }) => {
  if (!results) return null;

  return (
    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-2 text-red-500">Scan Results</h2>
      {results.length === 0 ? (
        <p className="text-gray-400">No vulnerabilities found.</p>
      ) : (
        <ul className="text-gray-300">
          {results.map((res, idx) => (
            <li key={idx} className="mb-1">
              <span className="font-semibold">{res.type}:</span> {res.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScanResults;
