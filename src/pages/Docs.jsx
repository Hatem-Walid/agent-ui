// pages/Docs.jsx
import { Link } from "react-router-dom";

const docs = [
  {
    id: "getting-started",
    title: "Getting Started",
    topics: [
      {
        title: "Installation",
        content: `
Install VulunSneak via npm or yarn. Make sure to set your API key in environment variables.
The agent supports all major backend frameworks. Once installed, the agent can scan your application automatically or via API calls.
`
      },
      {
        title: "Configuration",
        content: `
Configure scanning rules based on your project requirements. Enable or disable detection for specific vulnerabilities like SQL Injection or XSS.
Set severity thresholds to filter low-risk findings and focus on critical vulnerabilities.
`
      },
      {
        title: "First Scan",
        content: `
Run your first scan with VulunSneak. The scan will analyze your codebase, identify potential security flaws, and provide remediation suggestions.
Results are displayed with severity levels, example payloads, and code fixes.
`
      }
    ]
  },
  {
    id: "api-reference",
    title: "API Reference",
    topics: [
      {
        title: "Authentication",
        content: `
All API requests require an API key passed in the Authorization header.
Secure your key and rotate it regularly to prevent unauthorized access.
`
      },
      {
        title: "Scanning Endpoints",
        content: `
POST /api/v1/scan - Start a new scan
GET /api/v1/scan/{id} - Retrieve scan results
Each endpoint provides detailed JSON responses including vulnerabilities, affected files, and remediation steps.
`
      },
      {
        title: "Realtime Monitoring",
        content: `
Subscribe to WebSocket channels for live vulnerability alerts.
Receive instant notifications for SQL injections, XSS attempts, and command injections.
`
      }
    ]
  },
  {
    id: "vulnerability-guides",
    title: "Vulnerability Guides",
    topics: [
      {
        title: "SQL Injection",
        content: `
Understand how VulunSneak detects SQL Injection patterns.
Includes detection of tautologies, union queries, and blind injections.
Learn how to sanitize inputs and parameterize queries to prevent attacks.
`
      },
      {
        title: "Cross-Site Scripting (XSS)",
        content: `
Detects reflected, stored, and DOM-based XSS attacks.
Provides examples of payloads and automatic code fixes.
Best practices for encoding output and input validation are recommended.
`
      },
      {
        title: "CSRF",
        content: `
Cross-Site Request Forgery detection using token validation.
Learn how to implement anti-CSRF tokens in forms and headers.
VulunSneak monitors suspicious cross-origin requests.
`
      }
    ]
  },
  {
    id: "realtime-monitoring",
    title: "Realtime Monitoring",
    topics: [
      {
        title: "Live Traffic Analysis",
        content: `
Analyze incoming requests in real-time.
Identify malicious patterns, suspicious payloads, and unexpected behavior instantly.
`
      },
      {
        title: "Automatic Blocking",
        content: `
Automatically block IPs or sessions performing attacks.
Customizable rules let you control aggressive blocking or just logging.
`
      },
      {
        title: "Alerts & Notifications",
        content: `
Configure email or webhook alerts for critical vulnerabilities.
Keep your security team informed instantly when threats are detected.
`
      }
    ]
  },
  {
    id: "security-best-practices",
    title: "Security Best Practices",
    topics: [
      {
        title: "Secure Coding",
        content: `
Follow OWASP guidelines for secure code.
Validate inputs, sanitize outputs, and avoid unsafe functions.
`
      },
      {
        title: "Encryption & Privacy",
        content: `
Use AES-256 for sensitive logs and ensure they are cleared after analysis.
Data in transit should always be encrypted using TLS.
`
      },
      {
        title: "Minimizing False Positives",
        content: `
Configure VulunSneak scanning rules properly to reduce noise.
Analyze patterns and adjust thresholds to focus on real threats.
`
      }
    ]
  }
];

export default function Docs() {
  return (
    <div className="min-h-screen bg-[#0B0015] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#10001F] border-r border-purple-900 p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-purple-400 mb-8">Docs</h2>
        <ul className="space-y-4">
          {docs.map((doc) => (
            <li key={doc.id}>
              <a
                href={`#${doc.id}`}
                className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
              >
                {doc.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-300 mb-12 text-center">
          VulunSneak Documentation
        </h1>

        {docs.map((doc) => (
          <section key={doc.id} id={doc.id} className="mb-16">
            <h2 className="text-3xl font-semibold text-purple-400 mb-6">
              {doc.title}
            </h2>

            {doc.topics.map((topic, idx) => (
              <div key={idx} className="mb-8">
                <h3 className="text-2xl font-medium text-gray-200 mb-2">
                  {topic.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                  {topic.content}
                </p>
              </div>
            ))}
          </section>
        ))}

        <div className="mt-16 text-center">
          <Link
            to="/"
            className="text-purple-400 hover:underline font-semibold text-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
