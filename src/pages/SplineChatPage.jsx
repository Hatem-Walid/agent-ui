import { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../api/apiClient"; 
import { useAuth } from "../context/AuthContext"; // 1. استدعاء هوك المصادقة

// --- ShinyText Component (زي ما هو) ---
const ShinyText = ({ 
  text, 
  disabled = false, 
  speed = 5, 
  className = '',
  textColor = "#b5b5b5a4", 
  shineColor = "rgba(255, 255, 255, 0.8)", 
  gradientAngle = 120 
}) => {
  const animationDuration = `${speed}s`;
  return (
    <div
      className={`bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        color: textColor,
        backgroundImage: `linear-gradient(${gradientAngle}deg, rgba(255, 255, 255, 0) 40%, ${shineColor} 50%, rgba(255, 255, 255, 0) 60%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration
      }}
    >
      {text}
    </div>
  );
};

// --- ShinyInput Component (زي ما هو) ---
const ShinyInput = ({ 
  value, 
  onChange, 
  onKeyDown, 
  placeholder = "Type something...",
  className = "",
  shinySpeed = 3,
  textColor = "#b5b5b5a4",
  shineColor = "rgba(255, 255, 255, 0.8)",
  textClassName = "" 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent outline-none text-white relative z-10"
      />
      {!value && !isFocused && (
        <div className="absolute inset-0 flex items-center pointer-events-none z-0">
          <ShinyText 
            text={placeholder} 
            speed={shinySpeed}
            className={`text-current ${textClassName}`} 
            textColor={textColor}
            shineColor={shineColor}
          />
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
export default function SplineAgentPage() {
  const { user, logout } = useAuth(); // 2. استخدام بيانات اليوزر
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- File Upload Logic ---
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!started) setStarted(true);

    setMessages((prev) => [...prev, { sender: "user", text: `📎 Uploading: ${file.name}...` }]);

    try {
      const formData = new FormData();
      formData.append('formFile', file); 

      // الـ apiClient المفروض يكون فيه Interceptor بيحط التوكن اوتوماتيك
      const response = await apiClient.post("/api/v1/Chat/Message", formData);

      const data = response.data;
      const formattedReply = `
🔍 Analysis Result for ${data.filename || "File"}:

• Status: ${data.status || "N/A"}
• Vulnerability: ${data.vulnerability_name || "None detected"}
• Label: ${data.label || "Safe"}

📝 Comment:
${data.comment || "No comments provided."}
      `.trim();

      setMessages((prev) => [...prev, { sender: "bot", text: formattedReply }]);

    } catch (err) {
      console.error("Upload Error:", err);
      let msg = "❌ Failed to process file.";
      if (err.response) {
        msg += `\nStatus: ${err.response.status}`;
      } else {
        msg += `\nError: ${err.message}`;
      }
      setMessages((prev) => [...prev, { sender: "bot", text: msg }]);
    }
    event.target.value = null;
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    if (!started) setStarted(true);

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponses = [
        "Processing your request...",
        "I'm analyzing the security parameters based on your input.",
        "Could you provide more details about the target system?",
        "Log entry recorded. Awaiting further commands."
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [...prev, { sender: "bot", text: randomResponse }]);
    }, 1000);
  };

  // تجهيز اسم المستخدم للعرض
  const firstName = user?.firstName || user?.Name || "User";
  const userInitial = firstName.charAt(0).toUpperCase();

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black ">

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/u6UUd9ny38gtOZtR/scene.splinecode" />
      </div>

      {/* Sidebar toggle */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-6 left-6 z-50 p-3 bg-black/50 backdrop-blur-xl text-white rounded-2xl shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105 pointer-events-auto group border border-gray-700/50"
          >
            <div className="flex items-center  h-5">
              <motion.div animate={{ rotate: sidebarOpen ? 180 : 0 }} transition={{ duration: 1.0 }}>
                ☰
              </motion.div>
              <span className="text-sm font-medium opacity-0 pl-1 group-hover:opacity-100 transition-opacity duration-300 w-0 group-hover:w-auto overflow-hidden">
                 side panel
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, x: -320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -320 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-77 z-50 pointer-events-auto overflow-y-auto"
            >
              <div className="h-full bg-gradient-to-b from-purple-900/40 to-black/95 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                      V
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-xl">VULN SNEAK</h2>
                      <p className="text-gray-400 text-sm">AI Agent</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-3 bg-gray-800/80 backdrop-blur-md text-white rounded-xl hover:bg-blue-900/80 transition-all duration-300 border border-gray-700/50"
                  >
                    ✕
                  </button>
                </div>

                {/* Stats */}
                <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
                  <h3 className="text-white font-semibold mb-3">Session Stats</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-purple-500/20 rounded-xl p-3 text-center">
                      <div className="text-purple-300 text-sm">Scans</div>
                      <div className="text-white font-bold text-lg">Active</div>
                    </div>
                    <div className="bg-blue-500/20 rounded-xl p-3 text-center">
                      <div className="text-blue-300 text-sm">Status</div>
                      <div className="text-white font-bold text-lg">Secure</div>
                    </div>
                  </div>
                </div>

                {/* Menu / Chats */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-4">History</h3>
                  <div className="space-y-3">
                     <p className="text-gray-500 text-sm">No recent history...</p>
                  </div>
                </div>

                {/* User Profile - 3. عرض بيانات اليوزر ديناميكياً */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {userInitial}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-white font-medium truncate">{user?.name}</p>
                      <p className="text-gray-400 text-xs truncate">{user?.Email || "User Email"}</p>
                    </div>
                    {/* Logout Button inside Sidebar (Optional) */}
                    <button onClick={logout} className="text-red-400 hover:text-red-300 text-sm ml-2">
                        ➔
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
        
        {!started && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="w-full max-w-4xl px-6 flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: 0.2 }} 
              className="text-center mb-12"
            >
              <h1 className="text-6xl text-shadow-purple-950 font-light bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent mb-4">
                {/* 4. تغيير التحية لتكون ديناميكية */}
                Hello,{user?.name || "None"}
              </h1>
              <p className="text-gray-300 text-xl max-w-md mx-auto">
                Ready to analyze vulnerabilities and secure your projects?
              </p>
            </motion.div>

            <motion.div 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.4 }} 
              className="w-full max-w-2xl bg-black/50 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-2xl flex items-center pointer-events-auto gap-2"
            >
               <button
                onClick={triggerFileInput}
                className="p-3 text-white/70 hover:text-white transition-colors duration-200"
                title="Upload file"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>
              </button>

              <ShinyInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask your AI agent..."
                className="flex-1 p-3 text-lg"
                shinySpeed={3}
              />
              <button 
                onClick={sendMessage} 
                className="px-8 py-3 bg-black/70 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-black transition-all duration-300 border border-gray-700/50"
              >
                Send
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Chat UI */}
        <AnimatePresence>
          {started && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="w-full h-full pt-24 max-w-6xl mx-auto flex flex-col pointer-events-none"
            >
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] p-4 rounded-3xl backdrop-blur-xl ${
                      msg.sender === "user" 
                        ? " bg-white/50 backdrop-blur-xl text-black shadow-2xl shadow-black/45 border-b-black" 
                        : "bg-black/40 border border-white/20 text-white"
                    }`}>
                      <div className="flex items-start gap-3">
                        {msg.sender === "bot" && (
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                            AI
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                          <p className="text-xs opacity-70 mt-2">
                            {msg.sender === "user" ? "You" : "Spline Agent"} • Just now
                          </p>
                        </div>
                        {msg.sender === "user" && (
                          // 5. الحرف الأول من اسم اليوزر
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                            {userInitial}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Input Bar */}
              <div className="p-8 flex gap-4 pointer-events-auto bg-black/70 rounded-full items-center">
                <button
                    onClick={triggerFileInput}
                    className="p-3 text-white/70 hover:text-white transition-colors duration-200 border border-white/20 rounded-full hover:bg-white/10"
                    title="Upload file"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </svg>
                </button>

                <ShinyInput
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Message your AI agent..."
                    className="flex-1 bg-black/70 border border-white/20 p-5 rounded-full"
                    shinySpeed={3}
                    textClassName="ml-9" 
                />

                <button 
                  onClick={sendMessage} 
                  className="px-8 bg-black/70 text-white font-semibold rounded-full hover:bg-black/90 transition-all duration-300 border border-white/50"
                >
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes shine {
          0% { background-position: 100%; }
          100% { background-position: 0%; }
        }
        .animate-shine {
          animation: shine 8s linear infinite;
        }
      `}</style>
    </div>
  );
}