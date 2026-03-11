import { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from "framer-motion";

// --- API & AUTH CONFIGURATION ---
import apiClient from "../api/apiClient"; 
import { uploadClient } from "../api/uploadClient";
import { useAuth } from "../context/AuthContext"; 

/**
 * --- SUB-COMPONENT: ShinyText ---
 * Purpose: Animated text with a shimmering gradient effect.
 * Edit 'speed' or 'shineColor' to change the visual feel.
 */
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

/**
 * --- SUB-COMPONENT: ShinyInput ---
 * Purpose: A transparent input field that uses ShinyText for the placeholder.
 */
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

/**
 * --- MAIN COMPONENT: SplineAgentPage ---
 * This page handles the 3D Spline background, sidebar, and the AI Chat logic.
 */
export default function SplineAgentPage() {
  // --- 1. AUTHENTICATION ---
  const { user, logout } = useAuth(); 

  // --- 2. STATE MANAGEMENT ---
  const [started, setStarted] = useState(false);       
  const [messages, setMessages] = useState([]);        
  const [input, setInput] = useState("");               
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  // --- 3. REFS ---
  const messagesEndRef = useRef(null);   
  const fileInputRef = useRef(null);     
  const chatContainerRef = useRef(null); 

  // --- 4. SCROLLING EFFECTS ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop += e.deltaY;
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // --- NEW UTILITY: DOWNLOAD REPORT ---
  // تحويل الـ byte array (Base64) اللي جاي من الباك لملف PDF وتنزيله
  const downloadReport = (base64Data, fileName) => {
    if (!base64Data) return;
    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Report_${fileName || 'Scan'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // --- 5. API INTERACTION: FILE UPLOAD & ANALYSIS (UPDATED) ---
  /**
   * ENDPOINT: POST /api/v1/Chat/Message
   * RESPONSE EXPECTED: ScanSessionDto { status, vulnDtos[], fileReport, createdAt }
   */
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!started) setStarted(true);

    setMessages((prev) => [...prev, { sender: "user", text: `📎 Uploading: ${file.name}...` }]);

    try {
      const formData = new FormData();
      formData.append('formFile', file); 

      // Trigger the API request
      const response = await apiClient.post("/api/v1/Message/3", formData);
      const data = response.data; // This is the ScanSessionDto
      
      console.log("API Data received:", data);

      // التعامل مع قائمة الثغرات الجديدة (VulnDtos)
      // هناخد أول ثغرة كمثال للعرض في الشات، والتقرير الكامل هيكون في الـ PDF
      const mainVuln = data.vulnDtos && data.vulnDtos.length > 0 ? data.vulnDtos[0] : null;

      // Formatting the text for the chat UI
      const formattedReply = `
🔍 Analysis Result for ${file.name}:

• Status: ${data.status || "Completed"}
• Findings: ${data.vulnDtos?.length || 0} issues detected.
• Scan Date: ${data.createdAt ? new Date(data.createdAt).toLocaleString() : "N/A"}

📝 Top Finding: ${mainVuln?.vulnerability_name || "No major vulnerabilities"}
• Severity: ${mainVuln?.severity || "Safe"}
• Description: ${mainVuln?.comment || "No comments."}
      `.trim();

      setMessages((prev) => [...prev, { 
        sender: "bot", 
        text: formattedReply,
        label: mainVuln?.severity || "Safe", 
        snippet: mainVuln?.codeSnippet,
        fileReport: data.fileReport, // الحفاظ على ملف الـ PDF
        createdAt: data.createdAt,    // الحفاظ على تاريخ الإنشاء
        fileName: file.name
      }]);

    } catch (err) {
      console.error("Upload Error:", err);
      let msg = "❌ Failed to process file.";
      setMessages((prev) => [...prev, { sender: "bot", text: msg, label: "Safe" }]);
    }
    event.target.value = null; 
  };

  // --- 6. UI LOGIC: TEXT MESSAGING ---
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    if (!started) setStarted(true);

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Temporary Mock Response
    setTimeout(() => {
      const botResponses = [
        "The server is down, please try again later..",
        "Could you provide the file of the target system...?"
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [...prev, { sender: "bot", text: randomResponse, label: "Safe" }]);
    }, 1000);
  };

  // --- 7. HELPER: USER DETAILS ---
  const firstName = user?.firstName || user?.Name || "User";
  const userInitial = firstName.charAt(0).toUpperCase();

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black ">
      
      {/* Hidden system file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* BACKGROUND LAYER: 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/u6UUd9ny38gtOZtR/scene.splinecode" />
      </div>

      {/* OVERLAY LAYER: Sidebar Toggle Button */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-6 left-6 z-50 p-3 bg-black/50 backdrop-blur-xl text-white rounded-2xl shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105 pointer-events-auto group border border-gray-700/50"
          >
            <div className="flex items-center h-5">
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

      {/* SIDEBAR PANEL */}
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
                {/* Brand Identity */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                      V
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-xl">VulnSneak</h2>
                      <p className="text-gray-400 text-sm">AI Agent</p>
                    </div>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="p-3 bg-gray-800/80 backdrop-blur-md text-white rounded-xl hover:bg-blue-900/80 transition-all border border-gray-700/50">✕</button>
                </div>

                {/* Session Dashboard Stats */}
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

                {/* Chat History Placeholder */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-4">History</h3>
                  <div className="space-y-3">
                     <p className="text-gray-500 text-sm">This Model Using Temporary Chat . . .</p>
                  </div>
                </div>

                {/* User Profile / Logout API Hook */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {userInitial}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-white font-medium truncate">{user?.name}</p>
                      <p className="text-gray-400 text-xs truncate">{user?.Email || "User Email"}</p>
                    </div>
                    <button onClick={logout} className="text-red-400 hover:text-red-300 text-sm ml-2">➔</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FOREGROUND LAYER: Interactive UI */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
        
        {/* LANDING VIEW: Greeting and Initial Input */}
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
                Hello {user?.name || ""}
              </h1>
              <p className="text-gray-300 text-xl max-w-xl mx-auto">Ready to analyze vulnerabilities & secure your projects . . . ?</p>
            </motion.div>

            <motion.div 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.4 }} 
              className="relative w-full max-w-2xl p-[1.5px] overflow-hidden rounded-3xl shadow-2xl pointer-events-auto"
            >
              <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] [background:conic-gradient(from_90deg_at_50%_50%,transparent_0%,#8b5cf6_50%,transparent_100%)]" />
              <div className="relative z-10 flex items-center gap-2 w-full h-full bg-black/80 backdrop-blur-md rounded-[calc(1.5rem-1.5px)] p-6 border border-white/10">
                <button onClick={triggerFileInput} className="p-3 text-white/70 hover:text-white transition-colors duration-200" title="Upload file">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                  </svg>
                </button>
                <ShinyInput value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ask your AI agent..." className="flex-1 p-3 text-lg bg-transparent border-none outline-none text-white" />
                <button onClick={sendMessage} className="relative group p-[1px] overflow-hidden rounded-2xl transition-all shadow-lg">
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] [background:conic-gradient(from_90deg_at_50%_50%,transparent_0%,#8b5cf6_50%,transparent_100%)]" />
                  <span className="relative z-10 flex items-center justify-center px-8 py-3 bg-black/90 backdrop-blur-sm text-white font-semibold rounded-[calc(1rem-1px)] group-hover:bg-black transition-all">Send</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ACTIVE CHAT VIEW: Messages and Response Display */}
        <AnimatePresence>
          {started && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="w-full h-full pt-24 max-w-6xl mx-auto flex flex-col pointer-events-none relative"
            >
              <div className="flex-1 flex justify-center overflow-hidden">
                <div ref={chatContainerRef} className="w-full max-w-3xl p-6 overflow-y-auto space-y-4 pointer-events-none">
                  {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] p-4 rounded-3xl backdrop-blur-xl pointer-events-auto shadow-2xl ${msg.sender === "user" ? " bg-white/50 text-black shadow-black/45" : "bg-black/40 border border-white/20 text-white"}`}>
                        <div className="flex items-start gap-3">
                          {msg.sender === "bot" && (
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1">AI</div>
                          )}
                          <div className="flex-1 overflow-hidden">
                            <div className="leading-relaxed whitespace-pre-wrap text-sm">{msg.text}</div>
                            
                            {/* NEW: DOWNLOAD REPORT BUTTON */}
                            {msg.sender === "bot" && msg.fileReport && (
                              <button 
                                onClick={() => downloadReport(msg.fileReport, msg.fileName)}
                                className="mt-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-lg border border-white/10"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l4.5 4.5m0 0l4.5-4.5M12 3v13.5" />
                                </svg>
                                Download Report PDF
                              </button>
                            )}

                            {/* CODE DISPLAY: Shows only for Bot findings when label is not "Safe" */}
                            {msg.sender === "bot" && msg.label && msg.label.toLowerCase().trim() !== "safe" && msg.snippet && (
                              <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-black/70 shadow-2xl">
                                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                                  <span className="text-[10px] text-purple-300 font-mono font-bold uppercase tracking-wider">Vulnerable Code Snippet</span>
                                  <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                  </div>
                                </div>
                                <div className="p-4 overflow-x-auto bg-black/30">
                                  <pre className="text-xs font-mono text-cyan-300/90 leading-relaxed whitespace-pre select-all">{msg.snippet}</pre>
                                </div>
                              </div>
                            )}
                            
                            {/* TIMESTAMP: Showing actual scan session creation time */}
                            <p className="text-[10px] opacity-70 mt-2">
                              {msg.sender === "user" ? "You" : "Spline Agent"} • {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : "Just now"}
                            </p>
                          </div>
                          {msg.sender === "user" && (
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-1">{userInitial}</div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* STICKY BOTTOM INPUT (Chat mode) */}
              <div className="w-full max-w-3xl mx-auto px-4 pb-8 pointer-events-none">
                <div className="p-2 flex gap-2 pointer-events-auto bg-black/60 backdrop-blur-xl rounded-full items-center border border-white/10 shadow-2xl">
                  <button onClick={triggerFileInput} className="p-3 text-white/60 hover:text-white transition-all rounded-full hover:bg-white/10 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                      </svg>
                  </button>
                  <div className="flex-1 relative">
                      <ShinyInput value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Message your AI agent..." className="w-full bg-transparent border-none py-2 px-4 text-white" textClassName="ml-2" />
                  </div>
                  <button onClick={sendMessage} className="h-10 px-6 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 active:scale-95 transition-all shadow-lg">Send</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* GLOBAL CSS ANIMATIONS */}
      <style>{`
        @keyframes shine {
          0% { background-position: 100%; }
          100% { background-position: 0%; }
        }
        .animate-shine { animation: shine 8s linear infinite; }
      `}</style>
    </div>
  );
}