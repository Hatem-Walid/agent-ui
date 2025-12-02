// pages/FAQ.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is VulunSneak?",
    answer:
      "VulunSneak is a specialized AI security agent trained to detect and automatically patch vulnerabilities in software applications. " +
      "It actively analyzes code and traffic to identify SQL Injection, XSS, CSRF, insecure deserialization, path traversal, OS command injection, insecure cryptography, and XML vulnerabilities. " +
      "For each detected issue, it provides a detailed analysis including severity level, example payloads, and safe remediation steps, ensuring developers understand both the problem and the solution.",
  },
  {
    question: "How does VulunSneak detect SQL Injection?",
    answer:
      "VulunSneak monitors input fields, query parameters, and API calls to detect SQL injection patterns. " +
      "It uses both signature-based detection and AI models trained on real-world SQL injection attacks. " +
      "Once an injection is identified, VulunSneak provides the exact line of code that is vulnerable, the type of SQLi detected (e.g., Boolean-based, Union-based), and automatically suggests a sanitized version of the query to prevent exploitation.",
  },
  {
    question: "Can VulunSneak prevent XSS attacks?",
    answer:
      "Yes. VulunSneak scans all user input points including forms, URLs, and API payloads for XSS patterns. " +
      "It categorizes XSS into stored, reflected, and DOM-based types and explains the impact of each. " +
      "The agent then recommends proper escaping, content security policies (CSP), and sanitization techniques to neutralize the threat without breaking application functionality.",
  },
  {
    question: "Does VulunSneak help with CSRF vulnerabilities?",
    answer:
      "Absolutely. VulunSneak identifies forms and API endpoints that are vulnerable to CSRF attacks. " +
      "It checks for missing anti-CSRF tokens, insecure session handling, and weak authentication flows. " +
      "The tool then provides developers with actionable steps, like adding synchronized tokens or SameSite cookie attributes, to fully mitigate the CSRF risk while maintaining usability.",
  },
  {
    question: "How does VulunSneak handle insecure deserialization?",
    answer:
      "Insecure deserialization can allow attackers to execute arbitrary code or escalate privileges. VulunSneak inspects all serialized objects and incoming data streams for unsafe deserialization patterns. " +
      "It flags any unsafe practices, explains the potential impact, and guides developers on replacing them with secure serialization libraries or implementing strict input validation and integrity checks.",
  },
  {
    question: "Can VulunSneak detect path traversal attacks?",
    answer:
      "Yes. VulunSneak analyzes file and directory access points in the code to detect potential path traversal vulnerabilities. " +
      "It tests relative and absolute paths, URL manipulations, and user input that may alter file access. " +
      "Once detected, it provides clear instructions on sanitizing paths and implementing secure file access controls to prevent unauthorized file reading or writing.",
  },
  {
    question: "How secure is VulunSneak itself?",
    answer:
      "VulunSneak is built with security-first principles. All logs and user data are encrypted using AES-256, temporary data is cleared after analysis, and access to the agent is secured via API keys and authentication. " +
      "The system is continuously updated with the latest vulnerability datasets to ensure that both the agent and the analyzed applications remain secure against evolving threats.",
  },
  {
    question: "Can VulunSneak run in real-time?",
    answer:
      "Yes. VulunSneak has a real-time monitoring mode where it inspects incoming requests, API calls, and application events. " +
      "Suspicious activities trigger alerts instantly, and in certain configurations, malicious requests can be blocked automatically. " +
      "This feature helps prevent attacks from being successful while providing detailed logs for further investigation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-[#0B001F] text-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-16 text-center text-purple-400 drop-shadow-[0_0_25px_rgba(186,85,211,0.8)]">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#1A0033] border border-purple-700 rounded-2xl p-8 shadow-[0_0_20px_rgba(186,85,211,0.5)] hover:shadow-[0_0_30px_rgba(186,85,211,0.9)] transition-all duration-300"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full text-left flex justify-between items-center"
              >
                <span className="text-lg md:text-xl font-semibold text-purple-400">
                  {faq.question}
                </span>
                <span className="text-2xl text-purple-400 font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-gray-300 text-base md:text-lg leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/"
            className="text-purple-400 hover:underline font-semibold text-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
