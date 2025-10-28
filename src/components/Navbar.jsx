import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // الكشف عن حجم الشاشة
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { title: "Solutions", links: ["Code Analysis", "Vulnerability Scan", "Automation"] },
    { title: "Plans & Pricing", links: ["Free", "Pro", "Enterprise"] },
    { title: "Partners", links: ["Integrations", "Affiliates"] },
    { title: "Company", links: ["About Us", "Careers", "Contact"] },
    { title: "Resources", links: ["Docs", "API Reference", "Guides"] },
    { title: "Research", links: ["AI Models", "Reports", "Whitepapers"] },
  ];

  // إغلاق القوائم عند النقر خارجها (للموبايل)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="bg-[#0b1020] text-white py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link 
        to="/" 
        className="text-lg sm:text-xl lg:text-2xl font-bold text-violet-400 hover:text-violet-300 transition-colors duration-200"
      >
        CyberAgentX
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-6 xl:gap-8 relative">
        {menuItems.map((item, i) => (
          <li
            key={i}
            className="relative group cursor-pointer"
            onMouseEnter={() => !isMobile && setActiveDropdown(i)}
            onMouseLeave={() => !isMobile && setActiveDropdown(null)}
            onClick={() => isMobile && setActiveDropdown(activeDropdown === i ? null : i)}
          >
            <span className="hover:text-violet-400 transition-colors duration-200 py-2 block text-sm xl:text-base">
              {item.title}
            </span>
            
            {/* Desktop Dropdown */}
            {activeDropdown === i && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 top-full bg-[#141a2e] rounded-xl shadow-lg p-4 w-48 space-y-2 z-50 border border-violet-500/20"
              >
                {item.links.map((link, j) => (
                  <li 
                    key={j} 
                    className="hover:text-violet-300 transition-colors duration-200 py-1 px-2 rounded hover:bg-violet-500/10 cursor-pointer text-sm"
                  >
                    {link}
                  </li>
                ))}
              </motion.ul>
            )}
          </li>
        ))}
      </ul>

      {/* Desktop Auth Button */}
      <button
        onClick={() => navigate("/auth")}
        className="hidden lg:block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 text-sm xl:text-base"
      >
        Authentication
      </button>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden text-white focus:outline-none menu-toggle p-2 hover:bg-violet-500/10 rounded-full transition-colors duration-200"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                damping: 25
              }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#141a2e] shadow-2xl z-50 p-6 flex flex-col justify-between mobile-menu overflow-y-auto"
            >
              <div>
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-violet-500/20">
                  <h2 className="text-violet-400 font-bold text-xl">CyberAgentX</h2>
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="p-1 hover:bg-violet-500/10 rounded transition-colors duration-200"
                  >
                    <X size={24} />
                  </button>
                </div>

                <ul className="space-y-4">
                  {menuItems.map((item, i) => (
                    <div key={i} className="border-b border-violet-500/10 pb-4 last:border-b-0">
                      <p className="text-violet-300 font-semibold text-lg mb-2">{item.title}</p>
                      <ul className="ml-3 space-y-2">
                        {item.links.map((link, j) => (
                          <li
                            key={j}
                            className="text-gray-300 text-base hover:text-violet-400 transition-colors duration-200 py-1 px-2 rounded hover:bg-violet-500/10 cursor-pointer"
                            onClick={() => setMenuOpen(false)}
                          >
                            {link}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ul>
              </div>

              {/* Mobile Auth Button */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/auth");
                }}
                className="mt-8 bg-purple-600 hover:bg-purple-700 text-white w-full py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 text-base font-medium"
              >
                Authentication
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;