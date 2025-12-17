import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Moon, HelpCircle, ChevronRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const docs = [
  {
    id: "getting-started",
    category: "GETTING STARTED",
    title: "Getting Started",
    topics: [
      {
        title: "Installation",
        content: `Install VulunSneak via npm or yarn. Make sure to set your API key in environment variables.\nThe agent supports all major backend frameworks. Once installed, the agent can scan your application automatically or via API calls.`
      },
      {
        title: "Configuration",
        content: `Configure scanning rules based on your project requirements. Enable or disable detection for specific vulnerabilities like SQL Injection or XSS.\nSet severity thresholds to filter low-risk findings and focus on critical vulnerabilities.`
      },
      {
        title: "First Scan",
        content: `Run your first scan with VulunSneak. The scan will analyze your codebase, identify potential security flaws, and provide remediation suggestions.\nResults are displayed with severity levels, example payloads, and code fixes.`
      }
    ]
  },
  {
    id: "api-reference",
    category: "CORE CONCEPTS",
    title: "API Reference",
    topics: [
      {
        title: "Authentication",
        content: `All API requests require an API key passed in the Authorization header.\nSecure your key and rotate it regularly to prevent unauthorized access.`
      },
      {
        title: "Scanning Endpoints",
        content: `POST /api/v1/scan - Start a new scan\nGET /api/v1/scan/{id} - Retrieve scan results\nEach endpoint provides detailed JSON responses including vulnerabilities, affected files, and remediation steps.`
      }
    ]
  },
  {
    id: "vulnerability-guides",
    category: "FEATURES",
    title: "Vulnerability Guides",
    topics: [
      {
        title: "SQL Injection",
        content: `Understand how VulunSneak detects SQL Injection patterns.\nIncludes detection of tautologies, union queries, and blind injections.`
      },
      {
        title: "Cross-Site Scripting (XSS)",
        content: `Detects reflected, stored, and DOM-based XSS attacks.\nProvides examples of payloads and automatic code fixes.`
      }
    ]
  },
  {
    id: "security-best-practices",
    category: "USE CASES",
    title: "Security Best Practices",
    topics: [
      {
        title: "Secure Coding",
        content: `Follow OWASP guidelines for secure code.\nValidate inputs, sanitize outputs, and avoid unsafe functions.`
      },
      {
        title: "Encryption",
        content: `Use AES-256 for sensitive logs and ensure they are cleared after analysis.`
      }
    ]
  }
];

export default function Docs() {
  const [activeId, setActiveId] = useState("getting-started");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // دالة لتحديث القسم النشط عند السكرول
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const top = section.offsetTop - 150;
        const height = section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          setActiveId(section.getAttribute("id"));
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#05020D] text-gray-300 font-sans selection:bg-purple-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      {/* --- Header (Navbar) --- */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#05020D]/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-white text-xl">
             {/* Logo Icon Placeholder */}
              <div className="logo-container flex items-center md:absolute md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <img 
              src="\assets\main.svg"
              alt="Logo"
              className="h-14 w-auto"
            />
          </div>
          <div className="pl-7">
             VulnSneak
             </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-lg mx-8 relative">
          <Search className="absolute left-3 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search documentation..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
          />
          <div className="absolute right-3 text-xs text-gray-500 border border-white/10 px-1.5 rounded">⌘K</div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium hover:bg-white/5 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            Customer Services
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Moon className="w-5 h-5" />
          </button>
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* --- Main Layout --- */}
      <div className="pt-24 max-w-[1600px] mx-auto flex items-start justify-between px-6 relative z-10">

        {/* --- Left Sidebar (Navigation) --- */}
        <aside className={`fixed md:sticky top-20 left-0 w-64 h-[calc(100vh-6rem)] overflow-y-auto bg-[#05020D] md:bg-transparent z-40 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0 p-6" : "-translate-x-full md:translate-x-0"} md:block border-r border-white/5 md:border-none`}>
          <div className="space-y-8 pb-10">
            {docs.map((section, idx) => (
              <div key={section.id}>
                {/* Category Header (Only show if different from prev or first) */}
                <h4 className="text-xs font-bold text-gray-500 mb-4 tracking-wider uppercase flex items-center gap-2">
                  {idx === 0 || docs[idx-1].category !== section.category ? (
                     <>
                       {section.category === "GETTING STARTED" && "🚀"}
                       {section.category === "CORE CONCEPTS" && "⚡"}
                       {section.category === "FEATURES" && "🛡️"}
                       {section.category === "USE CASES" && "💡"}
                       {section.category}
                     </>
                  ) : null}
                </h4>
                
                <ul className="space-y-1">
                  <li>
                    <a
                      href={`#${section.id}`}
                      className={`block px-3 py-2 text-sm rounded-lg transition-all duration-200 border-l-2 ${
                        activeId === section.id
                          ? "border-purple-500 text-purple-300 bg-purple-500/10 font-medium"
                          : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {section.title}
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* --- Center Content --- */}
        <main className="flex-1 min-w-0 md:px-12 pb-20">
          
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Documentation</h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Welcome to VulunSneak Docs. Here you'll find comprehensive guides and documentation to help you start working with VulunSneak as quickly as possible.
            </p>
          </div>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

          {docs.map((doc) => (
            <section key={doc.id} id={doc.id} className="mb-20 scroll-mt-28">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 group">
                {doc.title}
                <span className="opacity-0 group-hover:opacity-100 text-purple-500 text-xl transition-opacity">#</span>
              </h2>

              <div className="space-y-12">
                {doc.topics.map((topic, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-white/10 hover:border-purple-500/50 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-gray-100 mb-3">
                      {topic.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-7 whitespace-pre-line">
                      {topic.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
          
          <div className="mt-20 pt-10 border-t border-white/10 flex justify-between">
             <Link to="/" className="text-gray-400 hover:text-white transition-colors">← Back to Home</Link>
             <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Edit this page on GitHub →</a>
          </div>
        </main>

        {/* --- Right Sidebar (Table of Contents) --- */}
        <aside className="hidden xl:block w-64 sticky top-24 h-[calc(100vh-6rem)]">
          <div className="pl-6 border-l border-white/10">
            <h5 className="text-sm font-bold text-white mb-4">On this page</h5>
            <ul className="space-y-3 text-sm">
              {docs.find(d => d.id === activeId)?.topics.map((topic, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors block leading-snug">
                    {topic.title}
                  </a>
                </li>
              )) || (
                 // Default showing first section topics if no scroll yet
                 docs[0].topics.map((topic, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors block leading-snug">
                      {topic.title}
                    </a>
                  </li>
                 ))
              )}
            </ul>
            
            <div className="mt-8 pt-8 border-t border-white/5">
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl p-4 border border-white/5">
                    <h6 className="text-xs font-bold text-white mb-2">Need Help?</h6>
                    <p className="text-xs text-gray-400 mb-3">Can't find what you're looking for?</p>
                    <button className="w-full py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors">
                        Contact Support
                    </button>
                </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}