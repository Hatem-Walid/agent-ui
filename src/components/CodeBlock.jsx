import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

// languages
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-json";

const fileIcons = {
  js: "🟨",
  ts: "🔷",
  tsx: "⚛️",
  jsx: "⚛️",
  html: "🌐",
  css: "🎨",
  json: "🧾",
};

function detectLanguage(filename) {
  if (!filename) return "javascript";
  return filename.split(".").pop();
}

export default function CodeBlock({ code, filename = "file.js" }) {
  const lang = detectLanguage(filename);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-800 bg-[#0b0b0b]">

      {/* header */}
      <div className="flex items-center justify-between bg-[#141414] px-4 py-2 text-sm text-zinc-300">
        <div className="flex items-center gap-2">
          <span>{fileIcons[lang] || "📄"}</span>
          <span>{filename}</span>
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="rounded-md bg-zinc-800 px-3 py-1 text-xs hover:bg-zinc-700"
        >
          Copy
        </button>
      </div>

      {/* code */}
      <pre className="max-h-[450px] overflow-x-auto p-4 text-sm">
        <code className={`language-${lang}`}>{code}</code>
      </pre>
    </div>
  );
}
