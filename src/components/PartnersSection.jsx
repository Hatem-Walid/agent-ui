// src/components/PartnersSection.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const logos = [
  // "public/logos/mama-removebg-preview.png",
  "public/logos/cs3.png",
  "public/logos/cs.png",
  "public/logos/cs2.png",
  // "public/logos/circle-removebg-preview.png",
  // "public/logos/compatia-removebg-preview.png",
  // "public/logos/hacker-removebg-preview.png",
];

export default function PartnersSection() {
  const [activeLogo, setActiveLogo] = useState(null);

  return (
    <section className="relative py-2 md:py-2 lg:py-2 overflow-hidden bg-[#000000]">
    
      {/* Logos Container */}
      <div className="relative w-full overflow-hidden">
        {/* First Row */}
        <motion.div
          className="flex items-center gap-12 md:gap-16 lg:gap-20 mb-6 md:mb-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div 
              key={`first-${i}`} 
              className="relative flex-shrink-0 group"
              onTouchStart={() => setActiveLogo(i)}
              onTouchEnd={() => setActiveLogo(null)}
            >
              <img
                src={logo}
                alt="Partner Logo"
                className={`h-8 md:h-10 lg:h-12 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0
                  ${activeLogo === i ? 'opacity-100 grayscale-0 scale-110' : ''}
                `}
              />
              
              {/* Hover Effect for Desktop */}
              <div className="absolute inset-0 blur-xl bg-purple-500/20 opacity-0 group-hover:opacity-40 transition duration-500 rounded-full scale-150 hidden md:block" />
              
              {/* Tap Effect for Mobile */}
              <div className={`absolute inset-0 blur-xl bg-purple-500/40 rounded-full scale-150 transition-all duration-200 md:hidden
                ${activeLogo === i ? 'opacity-60 scale-125' : 'opacity-0'}
              `} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#34003d83] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l  from-[#34003d83] to-transparent z-10" />
    </section>
  );
}