import React from "react";

const Highlights = () => {
  return (
    <section className="relative bg-[#0f0f1a] py-20 overflow-hidden">
      {/* Background waves effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-800/10 to-purple-900/20 blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-purple-400 mb-12">
          Powerful Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-[#151525]/90 border border-purple-700/30 rounded-2xl p-8 shadow-xl hover:shadow-purple-700/30 transition duration-500 backdrop-blur-md">
            <div className="text-purple-400 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Fast Performance
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience ultra-fast load times and seamless interaction with optimized performance.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#151525]/90 border border-purple-700/30 rounded-2xl p-8 shadow-xl hover:shadow-purple-700/30 transition duration-500 backdrop-blur-md">
            <div className="text-purple-400 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              Secure System
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your data is protected with advanced security layers and encrypted communication.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#151525]/90 border border-purple-700/30 rounded-2xl p-8 shadow-xl hover:shadow-purple-700/30 transition duration-500 backdrop-blur-md">
            <div className="text-purple-400 text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
              AI-Powered Insights
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Utilize intelligent analysis tools to make smarter, data-driven decisions effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
