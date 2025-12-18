import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  ArrowLeft, 
  Heart, 
  Share2,
} from "lucide-react";

const BlogPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "SQL Injection (SQLi): The Database Breach",
      excerpt: "SQL Injection allows an attacker to inject or modify SQL queries, often leading to unauthorized access, modification, or deletion of data in the database.",
      content: `
        <p class="mb-4 text-gray-300">
          SQL Injection (SQLi) is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database. It generally allows an attacker to view data that they are not normally able to retrieve.
        </p>
        <h3 class="text-2xl font-bold text-white mb-3 mt-6">How it Works</h3>
        <p class="mb-4 text-gray-300">
          This vulnerability occurs when user input is passed unsafely into backend SQL queries. Attackers can manipulate these queries to bypass authentication, access sensitive data, or even modify/delete the database structure.
        </p>
        <h3 class="text-2xl font-bold text-white mb-3 mt-6">Prevention</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2 text-gray-300">
          <li>Use <strong>Prepared Statements</strong> (Parameterized Queries).</li>
          <li>Use Stored Procedures.</li>
          <li>Perform Allow-list Input Validation.</li>
        </ul>
        <div class="mt-6 p-4 bg-purple-900/30 border-l-4 border-purple-500 rounded-r-lg">
          <p class="italic text-sm">For a complete guide on prevention, check the <a href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" target="_blank" class="text-purple-400 hover:underline">OWASP SQL Injection Prevention Cheat Sheet</a>.</p>
        </div>
      `,
      date: "Dec 17, 2025",
      tags: ["OWASP", "SQLi", "Injection"],
      image: "https://plus.unsplash.com/premium_photo-1664297989345-f4ff2063b212?q=80&w=798&auto=format&fit=crop",
      likes: 245,
      featured: true
    },
    {
      id: 2,
      title: "Cross-Site Scripting (XSS): Client-Side Attacks",
      excerpt: "XSS is an injection flaw where attackers inject malicious scripts (usually JavaScript) into web pages viewed by others, leading to session theft or content tampering.",
      content: `
        <p class="mb-4 text-gray-300">
          Cross-Site Scripting (XSS) attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user.
        </p>
        <h3 class="text-2xl font-bold text-white mb-3 mt-6">Impact</h3>
        <p class="mb-4 text-gray-300">
          Flaws that allow these attacks are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.
        </p>
        <h3 class="text-2xl font-bold text-white mb-3 mt-6">Mitigation Strategies</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2 text-gray-300">
          <li><strong>Output Encoding:</strong> Convert untrusted input into a safe form.</li>
          <li><strong>Content Security Policy (CSP):</strong> Restrict the sources of executable scripts.</li>
        </ul>
      `,
      date: "Dec 16, 2025",
      tags: ["XSS", "JavaScript", "Client-Side"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      likes: 189,
      featured: false
    },
    {
      id: 3,
      title: "OS Command Injection: Arbitrary Execution",
      excerpt: "Occurs when user input is passed unsafely into system commands, allowing attackers to execute arbitrary OS commands on the server.",
      content: `
        <p class="mb-4 text-gray-300">
          OS Command Injection (also known as Shell Injection) is a web security vulnerability that allows an attacker to execute arbitrary operating system (OS) commands.
        </p>
        <h3 class="text-2xl font-bold text-white mb-3 mt-6">The Risk</h3>
        <p class="mb-4 text-gray-300">
          This typically compromises the application and all its data. Often, an attacker can leverage an OS command injection vulnerability to compromise other parts of the hosting infrastructure.
        </p>
      `,
      date: "Dec 15, 2025",
      tags: ["RCE", "Shell", "CISA"],
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2074&auto=format&fit=crop",
      likes: 134,
      featured: false
    },
    {
        id: 4,
        title: "Insufficient Cryptography: Weak Protections",
        excerpt: "Using weak, outdated, or misconfigured cryptographic algorithms, keys, or protocols can let attackers read or tamper with sensitive data.",
        content: `
          <p class="mb-4 text-gray-300">
            Insufficient cryptography involves using algorithms that are known to be weak (like MD5 or SHA1 for passwords) or implementing custom crypto algorithms instead of standard libraries.
          </p>
          <h3 class="text-2xl font-bold text-white mb-3 mt-6">Mobile Top 10 Risk</h3>
          <p class="mb-4 text-gray-300">
            This is a critical issue in mobile and web apps where sensitive data (PII, passwords, health data) is stored. If the encryption is weak, attackers with physical access or network access can easily decrypt the data.
          </p>
        `,
        date: "Dec 14, 2025",
        tags: ["Crypto", "Encryption", "Mobile"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
        likes: 98,
        featured: false
      },
      {
        id: 5,
        title: "XML Injection & Security Risks",
        excerpt: "XML Injection is when attackers inject or modify XML content or structure so that the application processes unexpected data or behavior.",
        content: `
          <p class="mb-4 text-gray-300">
            XML vulnerabilities often arise from parsing untrusted XML data. The most common form is XML External Entity (XXE) attacks, where an attacker interferes with an application's processing of XML data.
          </p>
          <h3 class="text-2xl font-bold text-white mb-3 mt-6">Prevention</h3>
          <p class="mb-4 text-gray-300">
            The safest way to prevent XML Injection and XXE is to disable DTDs (External Entities) completely in your XML parser configuration.
          </p>
        `,
        date: "Dec 12, 2025",
        tags: ["XML", "XXE", "Parsers"],
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop",
        likes: 76,
        featured: false
      },
      {
        id: 6,
        title: "Path Traversal: Accessing Restricted Files",
        excerpt: "Also known as Directory Traversal, this lets attackers manipulate file paths (e.g., using ../) to access files outside the intended directory.",
        content: `
          <p class="mb-4 text-gray-300">
            A Path Traversal attack (also known as directory traversal) aims to access files and directories that are stored outside the web root folder.
          </p>
          <h3 class="text-2xl font-bold text-white mb-3 mt-6">Example</h3>
          <code class="block bg-black p-3 rounded mb-4 text-green-400">
            https://example.com/loadImage?filename=../../../etc/passwd
          </code>
        `,
        date: "Dec 10, 2025",
        tags: ["LFI", "FileSystem", "Access"],
        image: "https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?q=80&w=2070&auto=format&fit=crop",
        likes: 112,
        featured: false
      },
      {
        id: 7,
        title: "Cross-Site Request Forgery (CSRF)",
        excerpt: "CSRF tricks a victim’s browser into sending unintended requests using the victim’s existing session or credentials without their consent.",
        content: `
          <p class="mb-4 text-gray-300">
            Cross-Site Request Forgery (CSRF) forces an end user to execute unwanted actions on a web application in which they are currently authenticated.
          </p>
          <h3 class="text-2xl font-bold text-white mb-3 mt-6">Defense</h3>
          <p class="mb-4 text-gray-300">
            The most common defense is using <strong>Anti-CSRF Tokens</strong>—unique, unpredictable secrets submitted with every state-changing request.
          </p>
         `,
        date: "Dec 08, 2025",
        tags: ["CSRF", "Auth", "Session"],
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=870&auto=format&fit=crop",
        likes: 88,
        featured: false
      },
      {
        id: 8,
        title: "Insecure Deserialization: Object Manipulation",
        excerpt: "Happens when the application deserializes untrusted data, allowing attackers to manipulate objects or even execute arbitrary code.",
        content: `
          <p class="mb-4 text-gray-300">
            Insecure Deserialization is a vulnerability which occurs when untrusted data is used to abuse the logic of an application.
          </p>
          <h3 class="text-2xl font-bold text-white mb-3 mt-6">Why is it dangerous?</h3>
          <p class="mb-4 text-gray-300">
            It effectively allows an attacker to replace the data in an object with malicious data, leading to critical remote code execution (RCE).
          </p>
          `,
        date: "Dec 05, 2025",
        tags: ["Java", "Serialization", "RCE"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
        likes: 156,
        featured: false
      }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedPost(post);
  };

  const handleBackToList = () => setSelectedPost(null);

  const handleLike = (e, postId) => {
    e.stopPropagation();
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
    if (selectedPost && selectedPost.id === postId) setSelectedPost({...selectedPost, likes: selectedPost.likes + 1});
  };

  const featuredPost = useMemo(() => posts.find(p => p.featured), [posts]);

  return (
    <div className="min-h-screen bg-[#05020D] text-white py-28 px-4 font-sans selection:bg-purple-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="text-center mb-16">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                    Vulnerability Database
                  </h1>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    A comprehensive guide to critical web vulnerabilities and how to prevent them.
                  </p>
                </motion.div>
              </div>

              {/* Featured Post */}
              {featuredPost && (
                <div 
                  onClick={() => handlePostClick(featuredPost)}
                  className="mb-16 relative group cursor-pointer rounded-3xl overflow-hidden border border-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05020D] via-[#05020D]/60 to-transparent z-10" />
                  <img 
                    src={featuredPost.image} 
                    alt="Featured" 
                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                    <span className="inline-block px-3 py-1 bg-purple-600 rounded-full text-xs font-bold mb-4">CRITICAL RISK</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-purple-300 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mb-6 line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid Posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.filter(p => !p.featured).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handlePostClick(post)}
                    className="bg-[#120B2E]/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 cursor-pointer group flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {post.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-xs font-medium border border-white/10">{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs text-purple-400 mb-3 font-medium">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-4 text-gray-500">
                          <button onClick={(e) => handleLike(e, post.id)} className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                            <Heart className={`w-4 h-4 ${post.likes > 20 ? "fill-pink-500 text-pink-500" : ""}`} />
                            <span className="text-xs">{post.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          ) : (
            /* --- SINGLE POST VIEW --- */
            <motion.div
              key="single"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={handleBackToList}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 group transition-colors"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Database
              </button>

              <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-purple-900/20">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05020D] to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-xs font-bold">#{tag}</span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{selectedPost.title}</h1>
                  <div className="flex flex-wrap items-center gap-6 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      {selectedPost.date}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
                <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-purple-400 prose-strong:text-purple-200">
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                </article>

                <aside className="space-y-6">
                  <div className="bg-[#120B2E]/50 border border-white/10 rounded-2xl p-6 sticky top-24">
                    <h3 className="font-bold text-lg mb-4 text-white">Engagement</h3>
                    <div className="flex gap-4 mb-8">
                       <button className="p-3 bg-white/5 rounded-full hover:bg-blue-500 transition-colors"><Share2 className="w-5 h-5" /></button>
                       <button className="p-3 bg-white/5 rounded-full hover:bg-pink-500 transition-colors" onClick={(e) => handleLike(e, selectedPost.id)}>
                         <Heart className={`w-5 h-5 ${selectedPost.likes > 0 ? "fill-pink-500 text-pink-500" : ""}`} />
                       </button>
                    </div>

                    <h3 className="font-bold text-lg mb-4 text-white">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-400 cursor-pointer transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogPage;