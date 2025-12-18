import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout,           // Web UI
  Server,           // Backend API
  FileCode,         // Preprocessing
  Cpu,              // Hardware
  BrainCircuit,     // AI Model
  Wrench,           // Fixer
  MonitorPlay       // Web Dashboard
} from 'lucide-react';

// تعريف المراحل مع التركيز على طبقات الويب
const steps = [
  // --- Web Layer (Frontend) ---
  {
    id: 1,
    title: "Web Frontend Interface",
    description: "User uploads code via the React UI with real-time validation.",
    icon: <Layout size={24} />,
    color: "text-blue-400",
    glow: "shadow-blue-500/20",
    border: "border-blue-500/50"
  },
  
  // --- Web Layer (Backend) ---
  {
    id: 2,
    title: "Secure API Gateway",
    description: "Backend handles authentication and routes request to the proxy.",
    icon: <Server size={24} />,
    color: "text-indigo-400",
    glow: "shadow-indigo-500/20",
    border: "border-indigo-500/50"
  },

  // --- Processing Layer ---
  {
    id: 3,
    title: "Code Normalization",
    description: "Preprocessing script cleans and formats code for the AI model.",
    icon: <FileCode size={24} />,
    color: "text-cyan-400",
    glow: "shadow-cyan-500/20",
    border: "border-cyan-500/50"
  },

  // --- Hardware Layer ---
  {
    id: 4,
    title: "Raspberry Pi Proxy",
    description: "Isolated hardware layer that creates a secure tunnel for AI inference.",
    icon: <Cpu size={24} />,
    color: "text-amber-400",
    glow: "shadow-amber-500/20",
    border: "border-amber-500/50"
  },

  // --- AI Layer ---
  {
    id: 5,
    title: "AI Vulnerability Engine",
    description: "Transformer models scan for semantic security flaws.",
    icon: <BrainCircuit size={24} />,
    color: "text-purple-400",
    glow: "shadow-purple-500/20",
    border: "border-purple-500/50"
  },

  // --- Fix Layer ---
  {
    id: 6,
    title: "Auto-Remediation",
    description: "Generates secure patches for identified vulnerabilities.",
    icon: <Wrench size={24} />,
    color: "text-rose-400",
    glow: "shadow-rose-500/20",
    border: "border-rose-500/50"
  },

  // --- Web Layer (Final Dashboard) ---
  {
    id: 7,
    title: "Interactive Web Dashboard",
    description: "Visualizes results, shows diffs, and allows one-click fixes.",
    icon: <MonitorPlay size={24} />,
    color: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    border: "border-emerald-500/50"
  }
];

const AIWorkflow = () => {
  return (
    // الخلفية هنا واخدة لون الموقع الغامق #05020D عشان تضمن إنها مش بيضاء
    <section className="w-full py-20 px-6 bg-[#05020D] text-white overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          >
            Full-Stack Security Pipeline
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Trace the journey of your code from the web interface, through our hardware-isolated AI, and back to your dashboard.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-4 md:pl-3.5">
          
          {/* 1. الخط الثابت (رمادي غامق) */}
          <div className="absolute left-8 md:left-[3.2rem] top-0 bottom-0 w-1 bg-white/10 rounded-full" />

          {/* 2. الخط المتحرك المضيء (Gradient) */}
          <motion.div 
            className="absolute left-8 md:left-[3.2rem] top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] z-10"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />

          {/* 3. الخطوات (Steps) */}
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative flex items-start gap-8 z-20"
              >
                
                {/* الدائرة والأيقونة */}
                <div className={`
                  flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full 
                  bg-[#0A0A0A] border-2 ${step.border} 
                  flex items-center justify-center 
                  ${step.glow} shadow-xl z-20 
                  relative top-1
                `}>
                  <div className={`${step.color} transform transition-transform duration-300 hover:scale-110`}>
                    {step.icon}
                  </div>
                </div>

                {/* كارت المعلومات (Web Layers Labeling) */}
                <div className="flex-1 pt-2 group">
                  
                  {/* Label صغير فوق العنوان يوضح ده تبع أنهي طبقة */}
                  <span className={`text-xs font-mono uppercase tracking-wider mb-2 block opacity-70 ${step.color}`}>
                    {index === 0 || index === 6 ? 'Web Layer' : index === 1 ? 'API Layer' : 'Core Processing'}
                  </span>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>
                  
                  <div className="p-5 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AIWorkflow;