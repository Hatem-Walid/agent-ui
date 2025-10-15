import React from "react";

const HistoryTable = ({ history }) => {
  if (history.length === 0)
    return <p className="text-gray-400">No scan history yet.</p>;

  return (
    <div className="bg-[#121212] border border-gray-800 rounded-2xl p-4 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2 text-red-500">Scan History</h2>
      <table className="w-full text-gray-300 text-sm">
        <thead>
          <tr>
            <th className="text-left p-2 border-b border-gray-700">URL</th>
            <th className="text-left p-2 border-b border-gray-700">Date</th>
            <th className="text-left p-2 border-b border-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-800">
              <td className="p-2">{item.url}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">{item.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
