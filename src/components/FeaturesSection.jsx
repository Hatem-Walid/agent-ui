import React from "react";

const FeaturesSection = () => {
  const features = [
    { title: "AI-Powered Scans", desc: "Detect vulnerabilities automatically using smart agents." },
    { title: "Detailed Logs", desc: "Track every scan with a real-time logging panel." },
    { title: "Security Reports", desc: "Generate summaries of your recent scans in one click." },
  ];

  return (
    <section className="bg-[#121212] text-gray-200 py-16 px-8">
      <h2 className="text-3xl font-bold text-center text-red-500 mb-10">
        Platform Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, index) => (
          <div
            key={index}
            className="bg-[#1b1b1b] p-6 rounded-xl border border-gray-800 hover:border-red-600 transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
