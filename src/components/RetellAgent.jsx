import React, { useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';

const retellWebClient = new RetellWebClient();

const RetellAgent = () => {
  const [isCalling, setIsCalling] = useState(false);

  // البيانات الخاصة بك
  const AGENT_ID = "agent_9b47b3e56823c52808c6519818";
  const API_KEY = "key_b7f5ec9e816de552dd7a0892e3bd"; 

  const toggleCall = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
      setIsCalling(false);
      return;
    }

    try {
      const response = await fetch("https://api.retellai.com/v2/create-web-call", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ agent_id: AGENT_ID }),
      });

      if (!response.ok) throw new Error("Failed to get access token");
      const data = await response.json();

      await retellWebClient.startCall({ accessToken: data.access_token });
      setIsCalling(true);

      retellWebClient.on("call_ended", () => setIsCalling(false));
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ في الاتصال");
    }
  };

  const StarSVG = () => (
    <svg
      viewBox="0 0 784.11 815.53"
      style={{ shapeRendering: "geometricPrecision", fillRule: "evenodd" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
        fill="#fffdef"
      ></path>
    </svg>
  );

  return (
    <div className="agent-container">
      <style>{cssStyles}</style>
      
      <button 
        className={`ai-agent-btn ${isCalling ? 'is-calling' : ''}`} 
        onClick={toggleCall}
      >
        {isCalling ? "End Connection" : "Talk to VulnSneak"}
        
        {/* Stars Container */}
        <div className="star-1"><StarSVG /></div>
        <div className="star-2"><StarSVG /></div>
        <div className="star-3"><StarSVG /></div>
        <div className="star-4"><StarSVG /></div>
        <div className="star-5"><StarSVG /></div>
        <div className="star-6"><StarSVG /></div>
      </button>

      {isCalling && <p className="voice-status">AI is listening...</p>}
    </div>
  );
};

const cssStyles = `
.agent-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ================= BUTTON ================= */
.ai-agent-btn {
  --navy: #0a0b1e;
  --violet: #8b5cf6;
  --silver: #e1e1e1;
  
  position: relative;
  padding: 12px 26px;          /* ⬅ أصغر */
  background: var(--navy);
  font-size: 15px;             /* ⬅ أصغر */
  font-weight: 700;
  color: white;
  border-radius: 999px;        /* ⬅ نص دايرة حقيقي */
  border: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  z-index: 1;
  font-family: 'Inter', sans-serif;
}

/* ===== Animated Border ===== */
.ai-agent-btn:before,
.ai-agent-btn:after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 999px;        /* ⬅ نفس شكل الزر */
  background: linear-gradient(
    45deg,
    var(--navy),
    #1b1b1b,
    #2e2e2e,
    var(--violet),
    var(--silver),
    var(--violet),
    #2e2e2e,
    #1b1b1b,
    var(--navy)
  );
  background-size: 400%;
  z-index: -1;
  animation: steam 20s linear infinite;
}

.ai-agent-btn:after {
  filter: blur(20px);
  opacity: 0.6;
}

/* ================= STARS ================= */
.star-1, .star-2, .star-3, .star-4, .star-5, .star-6 {
  position: absolute;
  width: 14px;
  height: auto;
  z-index: -5;
  transition: all 0.8s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  opacity: 0;
}

.star-1 { top: 20%; left: 20%; width: 18px; }
.star-2 { top: 45%; left: 45%; width: 14px; }
.star-3 { top: 40%; left: 40%; width: 9px; }
.star-4 { top: 20%; left: 40%; width: 11px; }
.star-5 { top: 25%; left: 45%; width: 14px; }
.star-6 { top: 5%; left: 50%; width: 9px; }

/* ================= ANIMATION ================= */
@keyframes steam {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}

/* ================= HOVER / CALLING ================= */
.ai-agent-btn:hover,
.ai-agent-btn.is-calling {
  background: #000;
  box-shadow: 0 0 35px rgba(139, 92, 246, 0.35);
}

.ai-agent-btn.is-calling:before,
.ai-agent-btn.is-calling:after {
  animation-duration: 5s;
  background: linear-gradient(
    45deg,
    var(--navy),
    var(--violet),
    #fff,
    var(--violet),
    var(--navy)
  );
  background-size: 400%;
}

/* ===== Star Motion ===== */
.ai-agent-btn:hover .star-1,
.ai-agent-btn.is-calling .star-1 { top: -35%; left: -15%; opacity: 1; z-index: 2; }

.ai-agent-btn:hover .star-2,
.ai-agent-btn.is-calling .star-2 { top: 30%; left: -25%; opacity: 1; z-index: 2; }

.ai-agent-btn:hover .star-3,
.ai-agent-btn.is-calling .star-3 { top: 90%; left: 10%; opacity: 1; z-index: 2; }

.ai-agent-btn:hover .star-4,
.ai-agent-btn.is-calling .star-4 { top: -30%; left: 100%; opacity: 1; z-index: 2; }

.ai-agent-btn:hover .star-5,
.ai-agent-btn.is-calling .star-5 { top: 40%; left: 110%; opacity: 1; z-index: 2; }

.ai-agent-btn:hover .star-6,
.ai-agent-btn.is-calling .star-6 { top: 90%; left: 90%; opacity: 1; z-index: 2; }

/* ================= STATUS ================= */
.voice-status {
  margin-top: 12px;
  color: var(--violet);
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  animation: pulse 1.5s infinite alternate;
}

@keyframes pulse {
  from { opacity: 0.5; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
`;

export default RetellAgent;