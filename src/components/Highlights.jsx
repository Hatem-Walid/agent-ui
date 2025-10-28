// src/components/CheckmarkOneSection.jsx
import React, { useState } from "react";
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
  const [activeCard, setActiveCard] = useState(null);

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
    <section className="relative py-16 bg-gradient-to-br from-[#0f1025] via-[#1a1640] to-[#2a1460] overflow-hidden">
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-grid-slate-800/20" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* العنوان */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            The #1 Cloud-Native
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Application Security Platform
            </span>
          </h1>
        </motion.div>

        {/* الخط الفاصل */}
        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-12 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />

        {/* المحتوى */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* الكارد 1 */}
          <motion.div 
            className="bg-[#15172b]/60 backdrop-blur-md rounded-2xl p-6 shadow-2xl shadow-purple-900/20 border border-purple-800/30 hover:border-purple-500/60 hover:shadow-purple-900/40 transition-all duration-300"
            variants={itemVariants}
            onTouchStart={() => setActiveCard(1)}
            onTouchEnd={() => setActiveCard(null)}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                activeCard === 1 ? 'bg-purple-600 scale-110 shadow-lg shadow-purple-500/50' : 'bg-purple-900/40'
              }`}>
                <Users className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                activeCard === 1 ? 'text-purple-200' : 'text-purple-100'
              }`}>User Enablement</h3>
            </div>
            
            <div className="space-y-4">
              {userEnablement.map((item, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 transition-colors ${
                      activeCard === 1 ? 'text-purple-300' : 'text-purple-400'
                    }`} />
                    <span className={`transition-colors ${
                      activeCard === 1 ? 'text-white' : 'text-gray-300'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  <span className={`font-semibold px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    activeCard === 1 
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30' 
                      : 'bg-purple-900/30 text-purple-100'
                  }`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* تأثير اضافي للكارد عند الضغط */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none transition-opacity duration-300 ${
              activeCard === 1 ? 'opacity-100' : 'opacity-0'
            }`} />
          </motion.div>

          {/* Unified Dashboard */}
          <motion.div 
            className="bg-[#15172b]/60 backdrop-blur-md rounded-2xl p-6 shadow-2xl shadow-blue-900/20 border border-blue-800/30 hover:border-blue-500/60 hover:shadow-blue-900/40 transition-all duration-300"
            variants={itemVariants}
            onTouchStart={() => setActiveCard(2)}
            onTouchEnd={() => setActiveCard(null)}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                activeCard === 2 ? 'bg-blue-600 scale-110 shadow-lg shadow-blue-500/50' : 'bg-blue-900/40'
              }`}>
                <BarChart3 className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                activeCard === 2 ? 'text-blue-200' : 'text-purple-100'
              }`}>
                Unified Dashboard
              </h3>
            </div>
            <div className="space-y-4">
              {dashboardFeatures.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCard === 2 ? 'bg-blue-300 scale-150 shadow shadow-blue-300' : 'bg-blue-400'
                  }`} />
                  <item.icon className={`w-4 h-4 transition-colors ${
                    activeCard === 2 ? 'text-blue-200' : 'text-blue-300'
                  }`} />
                  <span className={`transition-colors ${
                    activeCard === 2 ? 'text-white' : 'text-gray-300'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* تأثير اضافي للكارد عند الضغط */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none transition-opacity duration-300 ${
              activeCard === 2 ? 'opacity-100' : 'opacity-0'
            }`} />
          </motion.div>

          {/* Supply Chain */}
          <motion.div 
            className="bg-[#15172b]/60 backdrop-blur-md rounded-2xl p-6 shadow-2xl shadow-indigo-900/20 border border-indigo-800/30 hover:border-indigo-500/60 hover:shadow-indigo-900/40 transition-all duration-300"
            variants={itemVariants}
            onTouchStart={() => setActiveCard(3)}
            onTouchEnd={() => setActiveCard(null)}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                activeCard === 3 ? 'bg-indigo-600 scale-110 shadow-lg shadow-indigo-500/50' : 'bg-indigo-900/40'
              }`}>
                <Globe className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                activeCard === 3 ? 'text-indigo-200' : 'text-purple-100'
              }`}>Supply Chain</h3>
            </div>
            <div className="space-y-4">
              {supplyChain.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCard === 3 ? 'bg-indigo-300 scale-150 shadow shadow-indigo-300' : 'bg-indigo-400'
                  }`} />
                  <item.icon className={`w-4 h-4 transition-colors ${
                    activeCard === 3 ? 'text-indigo-200' : 'text-indigo-300'
                  }`} />
                  <span className={`transition-colors ${
                    activeCard === 3 ? 'text-white' : 'text-gray-300'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* تأثير اضافي للكارد عند الضغط */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none transition-opacity duration-300 ${
              activeCard === 3 ? 'opacity-100' : 'opacity-0'
            }`} />
          </motion.div>

          {/* Services */}
          <motion.div 
            className="bg-[#15172b]/60 backdrop-blur-md rounded-2xl p-6 shadow-2xl shadow-fuchsia-900/20 border border-fuchsia-800/30 hover:border-fuchsia-500/60 hover:shadow-fuchsia-900/40 transition-all duration-300"
            variants={itemVariants}
            onTouchStart={() => setActiveCard(4)}
            onTouchEnd={() => setActiveCard(null)}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                activeCard === 4 ? 'bg-fuchsia-600 scale-110 shadow-lg shadow-fuchsia-500/50' : 'bg-fuchsia-900/40'
              }`}>
                <Server className="w-6 h-6 text-fuchsia-300" />
              </div>
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                activeCard === 4 ? 'text-fuchsia-200' : 'text-purple-100'
              }`}>Services</h3>
            </div>
            <div className="space-y-4">
              {services.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeCard === 4 ? 'bg-fuchsia-300 scale-150 shadow shadow-fuchsia-300' : 'bg-fuchsia-400'
                  }`} />
                  <item.icon className={`w-4 h-4 transition-colors ${
                    activeCard === 4 ? 'text-fuchsia-200' : 'text-fuchsia-300'
                  }`} />
                  <span className={`transition-colors ${
                    activeCard === 4 ? 'text-white' : 'text-gray-300'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* تأثير اضافي للكارد عند الضغط */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-transparent pointer-events-none transition-opacity duration-300 ${
              activeCard === 4 ? 'opacity-100' : 'opacity-0'
            }`} />
          </motion.div>
        </motion.div>

        {/* CTA Section مع صورة خلفية */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div 
            className="relative rounded-2xl p-8 text-white shadow-2xl border border-purple-500/30 overflow-hidden min-h-[300px] flex items-center justify-center"
            style={{
              backgroundImage: "url('/assets/Mid-Page-CTA-BG-.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay علشان النص يفضل واضح */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
            
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                <Shield className="w-4 h-4" />
                Ready for Smarter AppSec?
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Request a Demo</h3>
              <p className="text-purple-100 mb-6 text-sm md:text-base">
                Meet your always-on security partner. See how Developer Assist enables developers to ship faster, safer, and with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-white text-purple-700 px-6 py-3 rounded-xl hover:bg-purple-600 hover:text-purple-100 transition-all duration-300 font-semibold active:scale-95 min-h-[44px] shadow-lg shadow-purple-500/30">
                  Start Free Trial
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 hover:text-blue-800 transition-all duration-300 active:scale-95 min-h-[44px] shadow-lg shadow-white/20">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CheckmarkOneSection;