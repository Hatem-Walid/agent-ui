import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Target, 
  BrainCircuit, 
  Layers, 
  Sparkles, 
  Database, 
  Wrench, 
  CheckCircle2, 
  GitFork, 
  Cpu, 
  RefreshCw, 
  FileText, 
  UserCheck, 
  AlertTriangle, 
  Rocket,
  ExternalLink 
} from "lucide-react";

// تم تحديث البيانات والأيقونات لتناسب المحتوى الجديد
const faqs = [
  {
    icon: Target,
    question: "What problem does VulnSneak aim to solve?",
    answer:
      "VulnSneak addresses the lack of intelligent, automated solutions that can both detect and repair security vulnerabilities in web application source code. Traditional tools often suffer from high false positives, limited contextual understanding, and lack of automated remediation, especially for small teams and academic environments.",
  },
  {
    icon: BrainCircuit,
    question: "How is VulnSneak different from traditional SAST tools?",
    answer:
      "Unlike rule-based static analysis tools, VulnSneak uses Transformer-based AI models to analyze the semantic and structural meaning of source code. This allows the system to detect vulnerabilities based on insecure behavior patterns rather than fixed rules, improving adaptability and reducing noise.",
  },
  {
    icon: Layers,
    question: "Does VulnSneak analyze both frontend and backend code?",
    answer:
      "Yes. VulnSneak is designed to analyze both frontend and backend source code, reflecting real-world web application architectures where vulnerabilities may exist across multiple layers.",
  },
  {
    icon: Sparkles,
    question: "What role does machine learning play in VulnSneak?",
    answer:
      "Machine learning is central to VulnSneak. The system uses fine-tuned Transformer models trained on labeled datasets of vulnerable and fixed code samples to classify vulnerabilities and generate secure repair suggestions.",
  },
  {
    icon: Database,
    question: "How is the training dataset constructed?",
    answer:
      "The dataset is curated from public sources such as Hugging Face and Kaggle, enriched with manually reviewed examples, and aligned with OWASP Top 10 and CWE vulnerability standards. Each vulnerable code sample is linked to a corresponding secure fix to support both detection and repair tasks.",
  },
  {
    icon: Wrench,
    question: "How does VulnSneak generate secure code fixes?",
    answer:
      "After a vulnerability is detected, a secondary AI model generates context-aware repair suggestions using sequence-to-sequence learning. The goal is to produce syntactically valid fixes that preserve the original functionality while improving security.",
  },
  {
    icon: CheckCircle2,
    question: "How does the system ensure that fixes do not break functionality?",
    answer:
      "VulnSneak includes a validation stage where generated fixes can be reviewed, tested, or approved by the developer. This human-in-the-loop approach ensures that automated repairs do not introduce regressions or unintended behavior.",
  },
  {
    icon: GitFork,
    question: "Why does VulnSneak use a dual-model architecture?",
    answer:
      "The system separates vulnerability detection and repair into two specialized models. This design improves modularity, allows independent optimization of each task, and supports future experimentation with alternative detection or repair strategies.",
  },
  {
    icon: Cpu,
    question: "What is the purpose of the Raspberry Pi in the system architecture?",
    answer:
      "The Raspberry Pi acts as a secure proxy that isolates AI services from the main backend. It protects sensitive API keys, enforces privilege separation, and adds an extra security layer for handling external AI communications.",
  },
  {
    icon: RefreshCw,
    question: "Is VulnSneak suitable for CI/CD integration?",
    answer:
      "Yes. VulnSneak is designed to integrate into local development workflows and CI/CD pipelines, enabling continuous vulnerability detection and repair during the software development lifecycle.",
  },
  {
    icon: FileText,
    question: "How are vulnerabilities reported to the user?",
    answer:
      "The system generates a detailed report that includes the vulnerability type, affected code section, and suggested secure fix. This report is designed to be understandable even for users with limited security expertise.",
  },
  {
    icon: UserCheck,
    question: "Is VulnSneak intended to replace security experts?",
    answer:
      "No. VulnSneak is designed to assist developers, not replace human expertise. It provides intelligent recommendations while keeping developers in control of final decisions.",
  },
  {
    icon: AlertTriangle,
    question: "What are the limitations of VulnSneak?",
    answer:
      "As an academic research project, VulnSneak currently focuses on a subset of common web vulnerabilities. Some complex, context-dependent security issues may require further validation or manual review.",
  },
  {
    icon: Rocket,
    question: "What future improvements are planned for VulnSneak?",
    answer:
      "Future work includes expanding supported vulnerability types, improving automated fix validation, supporting additional programming languages, and enhancing integration with real-world development pipelines.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#05020D] text-white py-20 px-6 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 mt-10 gap-6">
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