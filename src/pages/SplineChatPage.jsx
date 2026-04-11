import { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from "framer-motion";

// --- API & AUTH CONFIGURATION ---
import apiClient, { 
  getAllChats, 
  getChatMessages, 
  createChat, 
  deleteChat, 
  renameChat 
} from "../api/apiClient"; 

import { useAuth } from "../context/AuthContext"; 

/**
 * --- SUB-COMPONENT: ShinyText ---
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
 */
export default function SplineAgentPage() {
  const { user, logout } = useAuth(); 

  const [started, setStarted] = useState(false);       
  const [messages, setMessages] = useState([]);        
  const [input, setInput] = useState("");               
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  
  const [chatsHistory, setChatsHistory] = useState([]); 
  const [currentChatId, setCurrentChatId] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false); 

  // --- States for Rename Logic ---
  const [editingChatId, setEditingChatId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const messagesEndRef = useRef(null);   
  const fileInputRef = useRef(null);     
  const chatContainerRef = useRef(null); 

  useEffect(() => {
    fetchHistory(); 
  }, []);

  const fetchHistory = async () => {
    try {
      const history = await getAllChats();
      setChatsHistory(Array.isArray(history) ? history : []);
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
      setChatsHistory([]); 
    }
  };

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

  // --- Handle Rename Submit ---
  const handleRenameSubmit = async (chatId) => {
    if (!renameValue.trim()) {
      setEditingChatId(null);
      return;
    }
    try {
      await renameChat(chatId, renameValue);
      setChatsHistory(prev => prev.map(chat => 
        (chat.chatId || chat.id) === chatId ? { ...chat, chatName: renameValue } : chat
      ));
      setEditingChatId(null);
      setRenameValue("");
    } catch (err) {
      console.error("Failed to rename:", err);
    }
  };

  const handleSelectOldChat = async (chatId) => {
    if (editingChatId) return; // Don't switch chat if we are renaming
    setIsProcessing(true);
    try {
      const historyData = await getChatMessages(chatId);
      const formattedMessages = [];

      if (Array.isArray(historyData)) {
        historyData.forEach(session => {
          formattedMessages.push({
            sender: "user",
            text: `📎 Processing: ${session.fileName || "File"}...`,
            createdAt: session.createdAt
          });

          const mainVuln = session.vulnDtos && session.vulnDtos.length > 0 ? session.vulnDtos[0] : null;
          const formattedReply = `
🔍 Analysis Result for ${session.fileName || 'file'}:

• Status: ${session.status || "Completed"}
• Findings: ${session.vulnDtos?.length || 0} vulnerabilities detected.
• Severity: ${mainVuln?.severity || "Safe"}
• Scan Date: ${session.createdAt ? new Date(session.createdAt).toLocaleString() : "Just now"}

📝 Expert AI Comment:
${mainVuln?.comment || "Analysis finished. Check the full report for details."}
          `.trim();

          formattedMessages.push({
            sender: "bot",
            text: formattedReply,
            label: mainVuln?.severity || "Safe",
            snippet: mainVuln?.codeSnippet,
            repair: mainVuln?.repairCodeSnippet,
            fileReport: session.fileReport,
            fileName: session.fileName,
            createdAt: session.createdAt
          });
        });
      }

      setMessages(formattedMessages);
      setCurrentChatId(chatId);
      setStarted(true);
      setSidebarOpen(false);
    } catch (err) {
      console.error("Failed to load chat:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteChat = async (e, chatId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure? This will delete all files associated with this chat.")) return;
    try {
      await deleteChat(chatId);
      setChatsHistory(prev => prev.filter(c => (c.chatId || c.id) !== chatId));
      if (currentChatId === chatId) handleNewChat();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const handleNewChat = () => {
    setStarted(false);
    setMessages([]);
    setCurrentChatId(null);
    setSidebarOpen(false);
  };

  const processFileAnalysis = async (file) => {
    let chatId = currentChatId;
    try {
      if (!chatId) {
        const newChat = await createChat(file.name);
        chatId = newChat.chatId || newChat.id;
        setCurrentChatId(chatId);
        
        const newEntry = { chatId: chatId, id: chatId, chatName: file.name, createdAt: new Date().toISOString() };
        setChatsHistory(prev => [newEntry, ...prev]);
        fetchHistory(); 
      }

      if (!started) setStarted(true);
      setMessages((prev) => [...prev, { sender: "user", text: `📎 Processing: ${file.name}...` }]);

      const formData = new FormData();
      formData.append('formFile', file); 

      const response = await apiClient.post(`/api/v1/Message/${chatId}`, formData);
      const data = response.data; 
      const mainVuln = data.vulnDtos && data.vulnDtos.length > 0 ? data.vulnDtos[0] : null;

      const formattedReply = `
🔍 Analysis Result for ${file.name}:

• Status: ${data.status || "Completed"}
• Findings: ${data.vulnDtos?.length || 0} vulnerabilities detected.
• Severity: ${mainVuln?.severity || "Safe"}
• Scan Date: ${data.createdAt ? new Date(data.createdAt).toLocaleString() : "Just now"}

📝 Expert AI Comment:
${mainVuln?.comment || "Analysis finished. Check the full report for details."}
      `.trim();

      setMessages((prev) => [...prev, { 
        sender: "bot", 
        text: formattedReply,
        label: mainVuln?.severity || "Safe", 
        snippet: mainVuln?.codeSnippet,
        repair: mainVuln?.repairCodeSnippet,
        fileReport: data.fileReport,
        fileName: file.name,
        createdAt: data.createdAt
      }]);

    } catch (err) {
      console.error("Analysis Error:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ Error: AI Model could not process this request.", label: "Safe" }]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const virtualFile = new File([input], "pasted_code.txt", { type: "text/plain" });
    setInput(""); 
    await processFileAnalysis(virtualFile);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) processFileAnalysis(file);
    event.target.value = null; 
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const userInitial = (user?.firstName || user?.name || "U").charAt(0).toUpperCase();

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black ">
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/u6UUd9ny38gtOZtR/scene.splinecode" />
      </div>

      {/* OVERLAY LAYER: Sidebar Toggle Button */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-6 left-6 z-50 p-4 bg-black/50 backdrop-blur-xl text-white rounded-2xl shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105 pointer-events-auto group border border-gray-700/50"
          >
            <div className="flex items-center h-5">
              <motion.div animate={{ rotate: sidebarOpen ? 180 : 0 }}> ☰ </motion.div>
              <span className="text-sm font-medium opacity-0 pl-2 group-hover:opacity-100 transition-opacity duration-300 w-0 group-hover:w-auto overflow-hidden">
                 History & Panel
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* SIDEBAR PANEL */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
            
            <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="fixed top-0 left-0 h-full w-80 z-50 pointer-events-auto overflow-y-auto"
            >
              <div className="h-full bg-linear-to-b from-purple-900/40 to-black/95 backdrop-blur-3xl border-r border-white/10 p-6 flex flex-col shadow-2xl">
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-tr from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">V</div>
                    <div>
                      <h2 className="text-white font-bold text-xl tracking-tight">VulnSneak</h2>
                      <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">History</p>
                    </div>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="p-2 text-white/50 hover:text-white transition-colors">✕</button>
                </div>

                <button 
                  onClick={handleNewChat}
                  className="w-full py-3 mb-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="text-lg">+</span> New Scan Session
                </button>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                  <h3 className="text-gray-500 text-[10px] font-bold uppercase mb-4 tracking-widest">Recent Scans</h3>
                  
                  {Array.isArray(chatsHistory) && chatsHistory.length > 0 ? (
                    chatsHistory.map((chat) => {
                      const chatId = chat.chatId || chat.id;
                      const isEditing = editingChatId === chatId;
                      return (
                        <div 
                          key={chatId}
                          onClick={() => !isEditing && handleSelectOldChat(chatId)}
                          className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${currentChatId === chatId ? 'bg-purple-600/20 border-purple-500/40' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                        >
                          <div className="flex items-center gap-3 overflow-hidden flex-1">
                            <div className={`w-2 h-2 rounded-full shrink-0 ${currentChatId === chatId ? 'bg-purple-400 animate-pulse' : 'bg-gray-600'}`} />
                            <div className="overflow-hidden flex-1">
                              {isEditing ? (
                                <input 
                                  autoFocus
                                  value={renameValue}
                                  onChange={(e) => setRenameValue(e.target.value)}
                                  onBlur={() => handleRenameSubmit(chatId)}
                                  onKeyDown={(e) => e.key === "Enter" && handleRenameSubmit(chatId)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="bg-black/40 border border-purple-500/50 rounded px-2 py-0.5 text-xs text-white w-full outline-none"
                                />
                              ) : (
                                <>
                                  <p className="text-white text-xs font-medium truncate">{chat.chatName || "Analysis Log"}</p>
                                  <p className="text-gray-500 text-[9px]">{chat.createdAt ? new Date(chat.createdAt).toLocaleDateString() : "Just now"}</p>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {!isEditing && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingChatId(chatId);
                                  setRenameValue(chat.chatName || "");
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-purple-400 transition-all transform hover:scale-110"
                              >
                                ✏️
                              </button>
                            )}
                            <button 
                              onClick={(e) => handleDeleteChat(e, chatId)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-red-400 transition-all transform hover:scale-110"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-10 text-center border border-dashed border-white/5 rounded-2xl">
                       <p className="text-gray-600 text-xs italic">No history available...</p>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center text-white font-black shadow-lg">
                      {userInitial}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-white font-bold text-xs truncate">{user?.name || "Security User"}</p>
                      <p className="text-gray-500 text-[10px] truncate">{user?.Email || "Active"}</p>
                    </div>
                    <button onClick={logout} className="text-red-400 hover:text-red-300 transition-colors text-lg ml-2">➔</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FOREGROUND LAYER */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
        {!started && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl px-6 flex flex-col items-center justify-center">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="text-center mb-12">
              <h1 className="text-6xl text-shadow-purple-950 font-black bg-linear-to-r from-purple-300 via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-4">
                Hello {user?.name || ""}
              </h1>
              <p className="text-gray-300 text-xl font-medium tracking-tight">Paste your code or upload a file for AI analysis...</p>
            </motion.div>

            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="relative w-full max-w-2xl p-[1.5px] overflow-hidden rounded-3xl shadow-2xl pointer-events-auto">
              <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] [background:conic-gradient(from_90deg_at_50%_50%,transparent_0%,#8b5cf6_50%,transparent_100%)]" />
              <div className="relative z-10 flex items-center gap-2 w-full h-full bg-black/90 backdrop-blur-md rounded-[calc(1.5rem-1.5px)] p-6 border border-white/10 shadow-inner">
                <button onClick={triggerFileInput} className="p-3 text-white/60 hover:text-white transition-all transform hover:rotate-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg>
                </button>
                <ShinyInput value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Paste your code here..." className="flex-1 p-3 text-lg" />
                <button onClick={sendMessage} className="relative group p-px overflow-hidden rounded-2xl shadow-xl transition-transform active:scale-95">
                  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] [background:conic-gradient(from_90deg_at_50%_50%,transparent_0%,#8b5cf6_50%,transparent_100%)]" />
                  <span className="relative z-10 flex items-center justify-center px-8 py-3 bg-black/90 text-white font-black rounded-[calc(1rem-1px)] group-hover:bg-black transition-all">SCAN</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ACTIVE CHAT VIEW */}
        <AnimatePresence>
          {started && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full h-full pt-24 max-w-6xl mx-auto flex flex-col pointer-events-none relative">
              <div className="flex-1 flex justify-center overflow-hidden">
                <div ref={chatContainerRef} className="w-full max-w-3xl p-6 overflow-y-auto space-y-6 pointer-events-none scroll-smooth custom-scrollbar">
                  {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] p-5 rounded-3xl backdrop-blur-xl pointer-events-auto shadow-2xl ${msg.sender === "user" ? " bg-white/50 text-black shadow-black/45" : "bg-black/60 border border-white/20 text-white"}`}>
                        <div className="flex items-start gap-4">
                          {msg.sender === "bot" && <div className="w-10 h-10 bg-linear-to-tr from-purple-600 to-blue-600 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] font-black shadow-lg">AI</div>}
                          <div className="flex-1 overflow-hidden">
                            <div className="leading-relaxed whitespace-pre-wrap text-sm font-medium">{msg.text}</div>
                            {msg.sender === "bot" && msg.fileReport && (
                              <button onClick={() => downloadReport(msg.fileReport, msg.fileName)} className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-black rounded-xl transition-all active:scale-95 shadow-lg border border-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l4.5 4.5m0 0l4.5-4.5M12 3v13.5" /></svg>
                                DOWNLOAD FULL ANALYSIS (PDF)
                              </button>
                            )}
                            {msg.sender === "bot" && msg.label && msg.label.toLowerCase().trim() !== "safe" && msg.snippet && (
                              <div className="mt-4 rounded-xl overflow-hidden border border-red-500/30 bg-black/80 shadow-2xl">
                                <div className="flex items-center justify-between px-4 py-2 bg-red-500/10 border-b border-white/5"><span className="text-[9px] text-red-400 font-black uppercase tracking-widest">Detected Vulnerability</span></div>
                                <div className="p-4 overflow-x-auto"><pre className="text-xs font-mono text-cyan-300/90 leading-relaxed select-all">{msg.snippet}</pre></div>
                              </div>
                            )}
                            {msg.sender === "bot" && msg.repair && (
                              <div className="mt-2 rounded-xl overflow-hidden border border-green-500/30 bg-black/80 shadow-2xl">
                                <div className="flex items-center justify-between px-4 py-2 bg-green-500/10 border-b border-white/5"><span className="text-[9px] text-green-400 font-black uppercase tracking-widest">Recommended Repair</span></div>
                                <div className="p-4 overflow-x-auto"><pre className="text-xs font-mono text-green-400/90 leading-relaxed select-all">{msg.repair}</pre></div>
                              </div>
                            )}
                            <p className="text-[9px] opacity-40 mt-3 font-bold uppercase tracking-tighter">{msg.sender === "user" ? "Security Admin" : "VulnSneak Agent"} • {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : "Scanning..."}</p>
                          </div>
                          {msg.sender === "user" && <div className="w-10 h-10 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] font-black shadow-lg">{userInitial}</div>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div className="w-full max-w-3xl mx-auto px-4 pb-8 pointer-events-auto">
                <div className="p-2 flex gap-2 pointer-events-auto bg-black/70 backdrop-blur-2xl rounded-full items-center border border-white/10 shadow-2xl">
                  <button onClick={triggerFileInput} className="p-3 text-white/40 hover:text-white transition-all rounded-full hover:bg-white/10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg></button>
                  <div className="flex-1 relative"><ShinyInput value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Paste code or ask your security agent..." className="w-full bg-transparent border-none py-2 px-4" textClassName="ml-2" /></div>
                  <button onClick={sendMessage} className="h-11 px-8 bg-white text-black text-xs font-black rounded-full hover:bg-gray-200 active:scale-95 transition-all shadow-lg">SCAN</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes shine { 0% { background-position: 100%; } 100% { background-position: 0%; } }
        .animate-shine { animation: shine 8s linear infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}