import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Moon, HelpCircle, Menu, X } from "lucide-react";

const docs = [
  {
    id: "getting-started",
    category: "GETTING STARTED",
    title: "Getting Started",
    topics: [
      {
        title: "Introduction",
        content: `VulnSneak is an AI-driven application security platform designed to assist developers in identifying and repairing security vulnerabilities directly at the source code level.
The system focuses on static analysis enhanced with machine learning, allowing it to understand the semantic behavior of code rather than relying solely on predefined rules.
VulnSneak is developed as an academic research project, aiming to bridge the gap between modern AI techniques and practical software security needs.`
      },
      {
        title: "System Overview",
        content: `At a high level, VulnSneak operates as an intelligent security agent that:
• Accepts frontend and backend source code as input  
• Analyzes the code using AI-based models  
• Detects potential security vulnerabilities  
• Generates secure repair suggestions  
• Provides structured security reports  
• Keeps the developer in full control of final decisions  
The system is designed to integrate naturally into existing development workflows.`
      },
      {
        title: "Installation & Setup",
        content: `VulnSneak can be deployed in a local or development environment.
The setup includes:
• Backend service for handling code uploads and processing  
• AI models for vulnerability detection and repair  
• Secure communication layer for external AI services  
Configuration typically involves defining environment variables, enabling or disabling specific analysis features, and preparing the system for local or CI/CD usage.`
      }
    ]
  },
  {
    id: "core-concepts",
    category: "CORE CONCEPTS",
    title: "Core Concepts",
    topics: [
      {
        title: "AI-Based Static Code Analysis",
        content: `Unlike traditional static analysis tools, VulnSneak treats source code as a structured language.
Using Transformer-based models, the system analyzes both syntax and semantics to identify insecure behavior patterns.
This approach allows VulnSneak to:
• Detect vulnerabilities even when code structure varies  
• Reduce dependence on hardcoded rules  
• Adapt more easily to new coding styles`
      },
      {
        title: "Vulnerability Detection Model",
        content: `The detection model is trained to classify code snippets into vulnerable or secure categories.
It focuses on vulnerabilities commonly found in web applications, including:
• SQL Injection  
• Cross-Site Scripting (XSS)  
• Improper input validation  
• Authentication and authorization weaknesses  
The model produces both a classification result and contextual metadata used in reporting.`
      },
      {
        title: "Automated Repair Model",
        content: `Once a vulnerability is identified, the repair model generates a secure alternative for the affected code segment.
This model uses sequence-to-sequence learning to map vulnerable code to a corrected version.
Key goals of the repair model:
• Preserve original functionality  
• Improve security posture  
• Maintain readability and maintainability  
Fixes are presented as recommendations, not automatic enforcement.`
      },
      {
        title: "Dual-Model Design Rationale",
        content: `Separating vulnerability detection and repair into two independent AI models allows:
• Independent training and evaluation  
• Better control over error propagation  
• Easier experimentation and future improvements  
This design choice is explicitly intended to support research flexibility.`
      }
    ]
  },
  {
    id: "system-architecture",
    category: "SYSTEM ARCHITECTURE",
    title: "System Architecture",
    topics: [
      {
        title: "Architectural Overview",
        content: `VulnSneak follows a modular architecture composed of:
• Frontend interface  
• Backend processing layer  
• AI detection and repair models  
• Secure proxy layer  
• Reporting and validation components  
Each component is isolated to minimize risk and simplify maintenance.`
      },
      {
        title: "Raspberry Pi Security Proxy",
        content: `A Raspberry Pi device is used as a security proxy between the backend and external AI services.
This proxy:
• Stores sensitive API credentials securely  
• Prevents direct exposure of AI services  
• Enforces privilege isolation  
• Adds an additional security boundary suitable for academic environments  
This design reflects real-world secure deployment principles.`
      },
      {
        title: "Processing Flow",
        content: `The system operates through the following steps:
1. Source code is uploaded by the developer  
2. Code is preprocessed and normalized  
3. Requests are routed through the secure proxy  
4. AI detection model scans the code  
5. Repair model is triggered if vulnerabilities are found  
6. Generated fixes pass through a validation phase  
7. Results are packaged into a security report`
      }
    ]
  },
  {
    id: "dataset-training",
    category: "DATASET & TRAINING",
    title: "Dataset & Model Training",
    topics: [
      {
        title: "Dataset Collection",
        content: `The dataset used to train VulnSneak is composed of:
• Public vulnerability datasets  
• Open-source code examples  
• Manually reviewed vulnerable and fixed snippets  
Each sample includes:
• Vulnerable code  
• Vulnerability label  
• Secure version of the code`
      },
      {
        title: "Labeling & Standards",
        content: `Dataset labeling is guided by established security standards:
• OWASP Top 10  
• CWE classifications  
This ensures that training focuses on vulnerabilities with real-world relevance.`
      },
      {
        title: "Data Preprocessing",
        content: `Before training, code samples undergo:
• Normalization  
• Noise removal  
• Consistent formatting  
• Tokenization suitable for Transformer models  
These steps improve training quality and model generalization.`
      }
    ]
  },
  {
    id: "features",
    category: "FEATURES",
    title: "Features",
    topics: [
      {
        title: "Frontend & Backend Coverage",
        content: `VulnSneak analyzes both client-side and server-side code, reflecting realistic web application attack surfaces.`
      },
      {
        title: "Security Reporting",
        content: `Generated reports include:
• Vulnerability type  
• Code location  
• Risk explanation  
• Suggested secure fix  
Reports are designed for clarity and educational value.`
      },
      {
        title: "Developer Control",
        content: `Developers review and approve fixes before applying them, supporting a human-in-the-loop security workflow.`
      }
    ]
  },
  {
    id: "use-cases",
    category: "USE CASES",
    title: "Use Cases",
    topics: [
      {
        title: "Secure Development Lifecycle",
        content: `VulnSneak helps detect vulnerabilities early, reducing security debt during later development stages.`
      },
      {
        title: "Academic & Educational Use",
        content: `The system serves as a teaching aid for:
• Secure coding practices  
• AI in cybersecurity  
• Static analysis techniques`
      },
      {
        title: "Continuous Integration",
        content: `VulnSneak can be connected to CI/CD pipelines to provide automated security feedback during code changes.`
      }
    ]
  },
  {
    id: "limitations-future",
    category: "LIMITATIONS & FUTURE WORK",
    title: "Limitations & Future Work",
    topics: [
      {
        title: "Limitations",
        content: `• Focused on static analysis  
• Limited vulnerability categories  
• Requires human validation for fixes  
• Does not replace expert security audits`
      },
      {
        title: "Future Work",
        content: `Planned enhancements include:
• Expanding vulnerability coverage  
• Improving automated fix validation  
• Supporting additional programming languages  
• Integrating runtime and hybrid analysis  
• Enhancing CI/CD automation and reporting`
      }
    ]
  }
];

export default function Docs() {
  const [activeId, setActiveId] = useState("getting-started");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection
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
        <Link to="/contact">
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium hover:bg-white/5 transition-colors">
              <HelpCircle className="w-3.5 h-3.5" />
              contact with us
            </button>
            {/* <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Moon className="w-5 h-5" />
            </button> */}
            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </Link>
      </header>

      {/* --- Main Layout --- */}
      <div className="pt-24 max-w-[1400px] mx-auto flex items-start justify-between px-6 relative z-10">

        {/* --- Left Sidebar (Hidden Scrollbar) --- */}
        <aside className={`fixed md:sticky top-20 left-0 w-80 h-[calc(100vh-6rem)] overflow-y-auto bg-[#05020D] md:bg-transparent z-40 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0 p-6 shadow-2xl" : "-translate-x-full md:translate-x-0"} md:block border-r border-white/5 md:border-none pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}>
          <div className="space-y-6 pb-20">
            {docs.map((section) => (
              <div key={section.id} className="group">
                {/* Main Section Link */}
                <a
                  href={`#${section.id}`}
                  className={`block text-base font-semibold transition-colors duration-200 mb-2 ${
                    activeId === section.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {section.title}
                </a>
                
                {/* Sub-Topics */}
                <ul className="space-y-1.5 border-l border-white/10 ml-1 pl-4">
                  {section.topics.map((topic, tIdx) => (
                    <li key={tIdx}>
                      <a
                        href={`#${section.id}-${tIdx}`}
                        className="block text-sm text-gray-500 hover:text-purple-400 transition-colors py-0.5 leading-snug"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {topic.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* --- Center Content --- */}
        <main className="flex-1 min-w-0 md:px-12 pb-20 w-full max-w-4xl mx-auto">
          
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Documentation</h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Welcome to VulnSneak Docs. Here you'll find comprehensive guides to help you identify and repair security vulnerabilities efficiently.
            </p>
          </div>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

          {docs.map((doc) => (
            <section key={doc.id} id={doc.id} className="mb-24 scroll-mt-28">
              {/* Main Section Title */}
              <h2 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-white/5 flex items-center gap-3 group">
                {doc.title}
                <a href={`#${doc.id}`} className="opacity-0 group-hover:opacity-100 text-purple-500 text-xl transition-opacity">#</a>
              </h2>

              <div className="space-y-16">
                {doc.topics.map((topic, idx) => (
                  <div key={idx} id={`${doc.id}-${idx}`} className="scroll-mt-32">
                    <h3 className="text-xl font-semibold text-purple-200 mb-4 flex items-center gap-2">
                       {topic.title}
                    </h3>
                    <div className="text-gray-400 text-base leading-7 whitespace-pre-line bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors">
                      {topic.content}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
          
          <div className="mt-20 pt-10 border-t border-white/10 flex justify-between">
             <Link to="/" className="text-gray-400 hover:text-white transition-colors">← Back to Home</Link>
          </div>
        </main>
        
      </div>
    </div>
  );
}