import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { title: "Solutions", links: ["Code Analysis", "Vulnerability Scan", "Automation"] },
    { title: "Plans & Pricing", links: ["Free", "Pro", "Enterprise"] },
    { title: "Partners", links: ["Integrations", "Affiliates"] },
    { title: "Company", links: ["About Us", "Careers", "Contact"] },
    { title: "Resources", links: ["Docs", "API Reference", "Guides"] },
    { title: "Research", links: ["AI Models", "Reports", "Whitepapers"] },
  ];

  return (
    <nav className="bg-[#0b1020] text-white py-4 px-6 sm:px-8 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-xl sm:text-2xl font-bold text-violet-400">
        CyberAgentX
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-8 relative">
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

      {/* Auth Button */}
      <button
        onClick={() => navigate("/auth")}
        className="hidden lg:block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition duration-300 shadow-md"
      >
        Authentication
      </button>

      {/* Mobile Menu Icon */}
      <button
        className="lg:hidden text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-[#141a2e] shadow-2xl z-50 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-violet-400 font-bold text-xl">CyberAgentX</h2>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={26} />
                </button>
              </div>

              <ul className="space-y-6">
                {menuItems.map((item, i) => (
                  <div key={i}>
                    <p className="text-violet-300 font-semibold">{item.title}</p>
                    <ul className="ml-3 mt-2 space-y-1">
                      {item.links.map((link, j) => (
                        <li
                          key={j}
                          className="text-gray-300 text-sm hover:text-violet-400 transition"
                        >
                          {link}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/auth");
              }}
              className="mt-8 bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded-full transition duration-300 shadow-md"
            >
              Authentication
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
