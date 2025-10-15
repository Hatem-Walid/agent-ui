import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-70px)] flex items-center justify-center text-center overflow-hidden bg-[#0f0f1a]">
      {/* Animated Waves */}
      <motion.div
        className="absolute bottom-0 left-0 w-full+100px overflow-hidden leading-none"
        animate={{ x: ["0%", "-6%", "0%"] }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
      >
        <svg
          className="relative block w-[110vw] h-40 md:h-56 lg:h-64"
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
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-purple-400 drop-shadow-[0_0_6px_rgba(124,58,237,0.8)]">
          Empower Your Security with AI
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">
          Discover how our platform leverages Artificial Intelligence to protect your applications,
          detect vulnerabilities, and ensure top-tier security across all layers.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-lg shadow-purple-800/40"
        >
          Explore Now
        </button>
      </div>
    </section>
  );
}
