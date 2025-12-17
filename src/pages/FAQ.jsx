import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Database, 
  Code2, 
  Lock, 
  FileCode, 
  FolderOpen, 
  ShieldAlert, 
  Zap,
  ExternalLink 
} from "lucide-react";

// قمت بإضافة أيقونة لكل سؤال ليتطابق مع ستايل الصورة
const faqs = [
  {
    icon: ShieldCheck,
    question: "What is VulunSneak?",
    answer:
      "VulunSneak is a specialized AI security agent trained to detect and automatically patch vulnerabilities in software applications. It actively analyzes code and traffic to identify SQL Injection, XSS, CSRF, and more, providing detailed analysis and safe remediation steps.",
  },
  {
    icon: Database,
    question: "How does VulunSneak detect SQL Injection?",
    answer:
      "VulunSneak monitors input fields, query parameters, and API calls. It uses AI models trained on real-world attacks to identify injection patterns. It pinpoints the vulnerable line of code and automatically suggests a sanitized version of the query.",
  },
  {
    icon: Code2,
    question: "Can VulunSneak prevent XSS attacks?",
    answer:
      "Yes. VulunSneak scans all user input points for XSS patterns. It categorizes them into stored, reflected, and DOM-based types, recommending proper escaping and CSP techniques to neutralize the threat without breaking functionality.",
  },
  {
    icon: Lock,
    question: "Does VulunSneak help with CSRF vulnerabilities?",
    answer:
      "Absolutely. It identifies endpoints vulnerable to CSRF by checking for missing tokens and weak authentication flows. It guides developers to add synchronized tokens or SameSite cookie attributes to mitigate the risk.",
  },
  {
    icon: FileCode,
    question: "How does it handle insecure deserialization?",
    answer:
      "VulunSneak inspects serialized objects and incoming data streams. It flags unsafe practices and guides developers on using secure libraries or implementing strict input validation and integrity checks.",
  },
  {
    icon: FolderOpen,
    question: "Can VulunSneak detect path traversal attacks?",
    answer:
      "Yes. It analyzes file access points to detect relative and absolute path manipulations. It provides instructions on sanitizing paths and implementing secure file access controls.",
  },
  {
    icon: ShieldAlert,
    question: "How secure is VulunSneak itself?",
    answer:
      "Built with security-first principles. All logs are encrypted (AES-256), temporary data is cleared post-analysis, and access is secured via API keys. The system is continuously updated against evolving threats.",
  },
  {
    icon: Zap,
    question: "Can VulunSneak run in real-time?",
    answer:
      "Yes. It features a real-time monitoring mode inspecting incoming requests. Suspicious activities trigger instant alerts, and malicious requests can be blocked automatically based on configuration.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#05020D] text-white py-20 px-6 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Quick answers to questions you may have. Can’t find what you’re looking for? 
              Check out our full <Link to="/doc" className="text-purple-400 underline decoration-purple-400/50 hover:decoration-purple-400 transition-all">documentation</Link>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              to="/doc"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 font-medium text-sm md:text-base"
            >
              Documentation
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </Link>
          </motion.div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex gap-5 items-start group"
            >
              {/* Icon Container */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300">
                <faq.icon className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold text-gray-100 group-hover:text-purple-200 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer / Load More */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <div className="p-[1px] rounded-lg bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full max-w-xs"></div>
          
          <div className="text-center space-y-4">
             <p className="text-gray-400">Still have questions?</p>
             <Link
                to="/contact"
                className="inline-block px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact our Team
              </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}