import React, { useState, useEffect } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';

// Initialize the Retell Client
const retellWebClient = new RetellWebClient();

const RetellAgent = () => {
  const [isCalling, setIsCalling] = useState(false);

  // --- Configuration ---
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

      retellWebClient.on("call_ended", () => {
        setIsCalling(false);
      });
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ في الاتصال بالاجينت");
    }
  };

  // Helper to split text into animated spans
  const renderLetters = (text) => {
    return text.split("").map((char, index) => (
      <span 
        key={index} 
        className="btn-letter" 
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <style>{cssStyles}</style>
      <div className="agent-container">
        <div className="btn-wrapper">
          <button 
            className={`retell-btn ${isCalling ? 'active-call' : ''}`} 
            onClick={toggleCall}
          >
            <svg className="btn-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              ></path>
            </svg>

            <div className="txt-wrapper">
              <div className="txt-1">
                {renderLetters("Talk to VulnSneak")}
              </div>
              <div className="txt-2">
                {renderLetters("End Call Now")}
              </div>
            </div>
          </button>
        </div>
        {isCalling && <p className="status-label">جاري التحدث الآن...</p>}
      </div>
    </>
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

.status-label {
  margin-top: 10px;
  font-family: sans-serif;
  font-size: 12px;
  color: #fff;
  opacity: 0.8;
  animation: flicker 2s infinite;
}

.btn-wrapper {
  position: relative;
  display: inline-block;
}

.retell-btn {
  --border-radius: 24px;
  --padding: 4px;
  --transition: 0.4s;
  --button-color: #101010;
  --highlight-color-hue: 210deg; /* Blue tint */

  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6em 1.2em 0.6em 1em;
  font-family: "Poppins", "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  background-color: var(--button-color);
  border: solid 1px #fff2;
  border-radius: var(--border-radius);
  cursor: pointer;
  position: relative;
  transition: box-shadow var(--transition), border var(--transition), background-color var(--transition);
  box-shadow:
    inset 0px 1px 1px rgba(255, 255, 255, 0.2),
    0px 4px 10px rgba(0, 0, 0, 0.3);
}

/* Red theme when calling */
.retell-btn.active-call {
  --highlight-color-hue: 0deg; /* Red tint */
  border: solid 1px rgba(255, 50, 50, 0.5);
}

.retell-btn::before {
  content: "";
  position: absolute;
  top: calc(0px - var(--padding));
  left: calc(0px - var(--padding));
  width: calc(100% + var(--padding) * 2);
  height: calc(100% + var(--padding) * 2);
  border-radius: calc(var(--border-radius) + var(--padding));
  pointer-events: none;
  background-image: linear-gradient(0deg, #0004, #000a);
  z-index: -1;
  box-shadow: 1px 1px 1px #fff2, -1px -1px 1px #0002;
}

.retell-btn::after {
  content: "";
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  border-radius: inherit;
  pointer-events: none;
  background-image: linear-gradient(0deg, #fff, hsl(var(--highlight-color-hue), 100%, 70%), transparent 10%);
  opacity: 0;
  transition: opacity var(--transition);
}

.retell-btn:hover::after, .retell-btn.active-call::after {
  opacity: 0.6;
}

.txt-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 140px;
  height: 24px;
}

.txt-1, .txt-2 {
  position: absolute;
  white-space: nowrap;
  transition: 0.4s ease-in-out;
}

.txt-2 { opacity: 0; transform: translateY(10px); }

/* Toggle visibility between the two texts */
.retell-btn.active-call .txt-1 { opacity: 0; transform: translateY(-10px); }
.retell-btn.active-call .txt-2 { opacity: 1; transform: translateY(0); }

.btn-letter {
  position: relative;
  display: inline-block;
  color: #fff5;
  animation: letter-anim 2s ease-in-out infinite;
}

@keyframes letter-anim {
  50% { text-shadow: 0 0 3px #fff8; color: #fff; }
}

/* SVG Styling */
.btn-svg {
  height: 22px;
  width: 22px;
  margin-right: 10px;
  fill: #e8e8e8;
  transition: 0.4s;
}

.retell-btn.active-call .btn-svg {
  fill: #ff4d4d;
  filter: drop-shadow(0 0 5px #ff4d4d);
}

.retell-btn:hover .btn-svg {
  fill: #fff;
}

/* Call Animation effect on letters */
.retell-btn.active-call .btn-letter {
  animation: focused-letter-anim 1s ease-in-out infinite;
}

@keyframes focused-letter-anim {
  50% {
    transform: scale(1.1);
    filter: brightness(150%);
    color: hsl(var(--highlight-color-hue), 100%, 80%);
  }
}

@keyframes flicker {
  50% { opacity: 0.4; }
}
`;

export default RetellAgent;