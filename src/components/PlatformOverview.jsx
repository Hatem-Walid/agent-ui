import { motion } from "framer-motion";
import { Shield, Cpu, Network, Cloud } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-10 h-10 text-purple-400" />,
    title: "Advanced Security",
    desc: "Multi-layer protection against vulnerabilities, threats, and unauthorized access.",
  },
  {
    icon: <Cpu className="w-10 h-10 text-purple-400" />,
    title: "AI-Powered Analysis",
    desc: "Utilizes smart AI models to detect issues faster and optimize performance.",
  },
  {
    icon: <Network className="w-10 h-10 text-purple-400" />,
    title: "Seamless Integration",
    desc: "Connect easily with your CI/CD pipelines and popular dev tools.",
  },
  {
    icon: <Cloud className="w-10 h-10 text-purple-400" />,
    title: "Cloud Ready",
    desc: "Deploy and manage your projects effortlessly in secure cloud environments.",
  },
];

export default function PlatformOverview() {
  return (
    <section className="bg-[#0b0f1a] text-white py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-purple-400 mb-4 drop-shadow-[0_0_6px_rgba(124,58,237,0.8)]"
        >
          Platform Overview
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Explore the core technologies that make CyberAgentX powerful, scalable, and secure for modern developers.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-[#141a2e]/60 backdrop-blur-md border border-purple-700/20 rounded-2xl p-8 shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-purple-300 mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
