import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Globe, Mail } from "lucide-react";

export default function Footer() {
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
    <footer className="relative overflow-hidden text-white">
      {/* Background gradient + glow grid */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-br from-[#0a031f] via-[#0b0830] to-[#0b1020] bg-[length:200%_200%]"
      />

      {/* Animated glowing grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px", "0px 0px"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(138,92,246,0.25) 1px, transparent 1px), linear-gradient(0deg, rgba(0,212,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          filter: "drop-shadow(0 0 6px rgba(139,92,246,0.4))",
        }}
      />

      <div className="relative z-10 container mx-auto px-8 py-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
        {Object.entries(sections).map(([title, links], i) => (
          <motion.div
            key={title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-purple-300">
              {title}
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 inline-block transition"
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
        >
          <h3 className="text-lg font-semibold mb-4 text-purple-300">
            Connect
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white/10 rounded-full hover:bg-purple-500/20 transition"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="relative z-10 border-t border-white/10 mt-10"></div>

      {/* Copyright */}
      <div className="relative z-10 text-center py-6 text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-purple-600 font-semibold">Golden Platform</span> — All
        Rights Reserved.
      </div>
    </footer>
  );
}
