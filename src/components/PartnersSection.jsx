// src/components/PartnersSection.jsx
import { motion } from "framer-motion";

const logos = [
  "/logos/pngwing.com (1).png",
  "/logos/pngwing.com (2).png",
  "/logos/pngwing.com (3).png",
  "/logos/pngwing.com (4).png",
  "/logos/pngwing.com (5).png",
  "/logos/pngwing.com(6).png",
  "/logos/pngwing.com (7).png",
  "/logos/pngwing.com.png",
];

export default function PartnersSection() {
  return (
    <section className="relative py-2 overflow-hidden bg-[#0b0f1d]">
     
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center gap-16 md:gap-24"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="relative flex-shrink-0 group">
              <img
                src={logo}
                alt="Partner Logo"
                className="h-9 md:h-9 object-contain opacity-80 group-hover:opacity-100 transition duration-300"
              />
              <div className="absolute inset-0 blur-xl bg-purple-500/30 opacity-0 group-hover:opacity-60 transition duration-500 rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
