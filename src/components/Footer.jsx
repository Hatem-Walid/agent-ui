import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Globe, Mail } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [activeLink, setActiveLink] = useState(null);
  const [activeSocial, setActiveSocial] = useState(null);

  const sections = {
    Company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Partners", href: "#" },
    ],
    Products: [
      { name: "Platform Overview", href: "#" },
      { name: "AppSec Agent", href: "#" },
      { name: "Cloud Scanner", href: "#" },
      { name: "Integrations", href: "#" },
    ],
    Resources: [
      { name: "Documentation", href: "#" },
      { name: "Blog", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Community", href: "#" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Security", href: "#" },
    ],
  };

  const socials = [
    { icon: Linkedin, href: "https://linkedin.com" },
    { icon: Github, href: "https://github.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Mail, href: "mailto:info@goldenplatform.io" },
    { icon: Globe, href: "https://goldenplatform.io" },
  ];

  return (
    <footer className="relative overflow-hidden text-white bg-gradient-to-br from-[#0a031f] via-[#0b0830] to-[#0b1020]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a031f] via-[#0b0830] to-[#0b1020]" />

      {/* Fixed grid overlay - بدون animation علشان تظهر على الموبايل */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(138,92,246,0.3) 1px, transparent 1px), linear-gradient(0deg, rgba(0,212,255,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-8 py-12 sm:py-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-10">
        {Object.entries(sections).map(([title, links], i) => (
          <motion.div
            key={title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-purple-300">
              {title}
            </h3>
            <ul className="space-y-2 sm:space-y-2 text-sm text-gray-400">
              {links.map((link, linkIndex) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`block py-1 transition-all duration-200 min-h-[36px] flex items-center ${
                      activeLink === `${title}-${linkIndex}` 
                        ? 'text-white translate-x-2 scale-105 font-medium bg-purple-500/20 rounded-lg px-2 -mx-2' 
                        : 'hover:text-white hover:translate-x-1'
                    }`}
                    onTouchStart={() => setActiveLink(`${title}-${linkIndex}`)}
                    onTouchEnd={() => setActiveLink(null)}
                    onMouseDown={() => setActiveLink(`${title}-${linkIndex}`)}
                    onMouseUp={() => setActiveLink(null)}
                    onMouseLeave={() => setActiveLink(null)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Social icons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-purple-300">
            Connect
          </h3>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-full transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  activeSocial === i 
                    ? 'bg-purple-500 scale-110 shadow-lg shadow-purple-500/50' 
                    : 'bg-white/10 hover:bg-purple-500/20'
                }`}
                onTouchStart={() => setActiveSocial(i)}
                onTouchEnd={() => setActiveSocial(null)}
                onMouseDown={() => setActiveSocial(i)}
                onMouseUp={() => setActiveSocial(null)}
                onMouseLeave={() => setActiveSocial(null)}
              >
                <social.icon size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="relative z-10 border-t border-white/10 mx-4 sm:mx-8 mt-8 sm:mt-10"></div>

      {/* Copyright */}
      <div className="relative z-10 text-center py-4 sm:py-6 text-sm text-gray-400 px-4">
        © {new Date().getFullYear()}{" "}
        <span className="text-purple-400 font-semibold">VulnSneak</span> — All
        Rights Reserved.
      </div>
    </footer>
  );
}