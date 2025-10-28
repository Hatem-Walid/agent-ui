// src/components/CheckmarkOneSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Cloud, 
  Code, 
  GitBranch, 
  BarChart3, 
  Workflow, 
  Users, 
  Server,
  Cpu,
  Lock,
  Zap,
  Globe
} from "lucide-react";

const CheckmarkOneSection = () => {
  const userEnablement = [
    { icon: Users, label: "Confidential", value: "Enterprise" },
    { icon: GitBranch, label: "DevOps/CI/CD", value: "Full Integration" },
    { icon: Code, label: "Languages", value: "360+" },
    { icon: Server, label: "Frameworks", value: "5000+" },
    { icon: Cpu, label: "Technologies", value: "360+" },
    { icon: Workflow, label: "Integration", value: "8000+" }
  ];

  const dashboardFeatures = [
    { icon: BarChart3, label: "Application Security Posture Management (ASPM)" },
    { icon: Cpu, label: "AI Powered Security" },
    { icon: Code, label: "Code Security" },
    { icon: Shield, label: "SAST & DAST" },
    { icon: Lock, label: "API Security" },
    { icon: Zap, label: "AI Security" }
  ];

  const supplyChain = [
    { icon: Globe, label: "Software Composition Analysis (SCA)" },
    { icon: Users, label: "Multi-user/Partner Protection" },
    { icon: Cpu, label: "AI Security" },
    { icon: Shield, label: "Secure Execution" },
    { icon: BarChart3, label: "Regulatory Health" }
  ];

  const services = [
    { icon: Users, label: "Premium Support" },
    { icon: Server, label: "Premium Services" },
    { icon: Shield, label: "Security Assessment" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0f1025] via-[#1a1640] to-[#2a1460] overflow-hidden">
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-grid-slate-800/20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* العنوان */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            The #1 Cloud-Native
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Application Security Platform
            </span>
          </h1>
        </motion.div>

        {/* الخط الفاصل */}
        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-16 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />

        {/* المحتوى */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* الكارد 1 */}
          <motion.div 
            className="bg-[#15172b]/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-800/30 hover:border-purple-500/60 hover:shadow-purple-900/40 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-900/40 rounded-lg">
                <Users className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-purple-100">User Enablement</h3>
            </div>
            
            <div className="space-y-4">
              {userEnablement.map((item, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-purple-100 font-semibold bg-purple-900/30 px-3 py-1 rounded-full text-sm group-hover:bg-purple-800/50 transition-colors">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* الباقي من الكروت نفس النظام */}
          {/* Unified Dashboard */}
          <motion.div 
            className="bg-[#15172b]/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-800/30 hover:border-purple-500/60 hover:shadow-purple-900/40 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-900/40 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-purple-100">
                Unified Dashboard
              </h3>
            </div>
            <div className="space-y-4">
              {dashboardFeatures.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-150 transition-transform" />
                  <item.icon className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Supply Chain */}
          <motion.div 
            className="bg-[#15172b]/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-800/30 hover:border-purple-500/60 hover:shadow-purple-900/40 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-900/40 rounded-lg">
                <Globe className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-xl font-bold text-purple-100">Supply Chain</h3>
            </div>
            <div className="space-y-4">
              {supplyChain.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full group-hover:scale-150 transition-transform" />
                  <item.icon className="w-4 h-4 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="bg-[#15172b]/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-purple-800/30 hover:border-purple-500/60 hover:shadow-purple-900/40 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-fuchsia-900/40 rounded-lg">
                <Server className="w-6 h-6 text-fuchsia-300" />
              </div>
              <h3 className="text-xl font-bold text-purple-100">Services</h3>
            </div>
            <div className="space-y-4">
              {services.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-fuchsia-400 rounded-full group-hover:scale-150 transition-transform" />
                  <item.icon className="w-4 h-4 text-fuchsia-300 group-hover:text-fuchsia-200 transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
                <div className="bg-[url('C:\Users\toomy\agent-ui\public\assets\Mid-Page-CTA-BG-.webp')] bg-cover bg-center rounded-2xl p-10 text-white shadow-lg border border-purple-500/30">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Ready for Smarter AppSec?
          </div>
          <h3 className="text-4xl font-bold mb-5">Request a Demo</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Meet your always-on security partner. See how Developer Assist enables developers to ship faster, safer, and with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-700 px-8 py-3 rounded-xl hover:bg-purple-600 hover:text-purple-100 transition-colors font-semibold">
              Start Free Trial
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 hover:text-blue-800 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>

        </motion.div>
      </div>
    </section>
  );
};

export default CheckmarkOneSection;
