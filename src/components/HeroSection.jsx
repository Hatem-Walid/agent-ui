import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import LiquidEther from "./LiquidEther";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh)] flex items-center justify-center text-center overflow-hidden px-6 lg:px-8 bg-transparent">
      
      {/* Liquid Ether Background – full screen */}
      <div className="absolute inset-0 -z-10 w-full h-full pointer-events-none">
        <LiquidEther className="w-full h-full" />
      </div>
      
      <div className="absolute inset-0 -z-20 bg-[#000000]"></div>

      
      {/* Content */}
      <div className="relative z-20 max-w-6xl px-4 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-purple-100/15 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20 hover:bg-purple-100/25 transition-all duration-300 cursor-default"
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

<div className="flex justify-center items-center gap-6 text-center">

  {/* Get Started – Purple Glass Button */}
  <motion.button
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.35 }}
    onClick={() => navigate("/dashboard")}
    className="
      px-9 py-2 rounded-full font-semibold text-white 
      text-base md:text-lg
      backdrop-blur-2xl 
      bg-purple-500/20 
      border border-purple-300/20
      hover:bg-purple-500/30
      transition-all duration-300 
      shadow-[0_0_20px_rgba(168,85,247,0.25)]
      hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]
      hover:scale-105 active:scale-95
    "
  >
    Get Started
  </motion.button>

    {/* Learn More – Glass Button */}
  <motion.button
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.3 }}
    onClick={() => navigate("/dashboard")}
    className="
      px-9 py-2 rounded-full font-semibold text-white 
      text-base md:text-lg
      backdrop-blur-2xl 
      bg-white/10 
      border border-white/20
      hover:bg-white/20
      transition-all duration-300 
      shadow-[0_0_15px_rgba(255,255,255,0.15)]
      hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]
      hover:scale-105 active:scale-95
    "
  >
    Learn More
  </motion.button>
</div>

        {/* Info */}
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
