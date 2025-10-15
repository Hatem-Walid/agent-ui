import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate(); // ✅ هنا الإضافة المهمة

  const menuItems = [
    { title: "Solutions", links: ["Code Analysis", "Vulnerability Scan", "Automation"] },
    { title: "Plans & Pricing", links: ["Free", "Pro", "Enterprise"] },
    { title: "Partners", links: ["Integrations", "Affiliates"] },
    { title: "Company", links: ["About Us", "Careers", "Contact"] },
    { title: "Resources", links: ["Docs", "API Reference", "Guides"] },
    { title: "Research", links: ["AI Models", "Reports", "Whitepapers"] },
  ];

  return (
    <nav className="bg-[#0b1020] text-white py-4 px-8 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-violet-400">CyberAgentX</Link>

      {/* Menu */}
      <ul className="flex gap-8 relative">
        {menuItems.map((item, i) => (
          <li
            key={i}
            className="relative group cursor-pointer"
            onMouseEnter={() => setActiveDropdown(i)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <span className="hover:text-violet-400 transition">{item.title}</span>
            {activeDropdown === i && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 top-8 bg-[#141a2e] rounded-xl shadow-lg p-4 w-48 space-y-2"
              >
                {item.links.map((link, j) => (
                  <li key={j} className="hover:text-violet-300 transition">
                    {link}
                  </li>
                ))}
              </motion.ul>
            )}
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        onClick={() => navigate("/auth")}
        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition duration-300 shadow-md"
      >
        Authentication
      </button>
    </nav>
  );
};

export default Navbar;
