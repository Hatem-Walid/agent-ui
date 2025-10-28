import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-70px)] flex items-center justify-center text-center overflow-hidden bg-[#0f0f1a] px-6 lg:px-8">
      {/* Animated Waves */}
      <motion.div
        className="absolute bottom-0 left-0 w-[120%] overflow-hidden leading-none z-0"
        animate={{ x: ["0%", "-8%", "0%"] }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
        }}
      >
        <svg
          className="relative block w-full h-28 md:h-36 lg:h-44 xl:h-52"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#7C3AED"
            fillOpacity="0.6"
            d="M0,160L40,154.7C80,149,160,139,240,154.7C320,171,400,213,480,213.3C560,213,640,171,720,165.3C800,160,880,192,960,181.3C1040,171,1120,117,1200,101.3C1280,85,1360,107,1400,117.3L1440,128V320H0Z"
          ></path>
          <path
            fill="#9F7AEA"
            fillOpacity="0.4"
            d="M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,197.3C672,192,768,160,864,149.3C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160V320H0Z"
          ></path>
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-4 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-purple-100/15 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-purple-500/20 hover:bg-purple-100/25 transition-all duration-300 cursor-default"
        >
          <Shield className="w-4 h-4" />
          CyberAgentX
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold mb-1 block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 leading-snug md:leading-normal"
        >
          Empower Your Security
          
            with AI
          
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto px-4"
        >
          You're always ready to run with a full suite that helps security teams 
          and developers secure applications from the first line of code to cloud deployment.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onClick={() => navigate("/dashboard")}
          className="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-purple-800/30 hover:shadow-purple-800/50 hover:scale-105 active:scale-95 text-base md:text-lg"
        >
          Explore Now
        </motion.button>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Trusted by 10,000+ security teams
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Enterprise-grade security
          </div>
        </motion.div>
      </div>
    </section>
  );
}