import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share2,
  Tag 
} from "lucide-react";

const BlogPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Introduction to VulunSneak: The Future of AI Security",
      excerpt: "Discover how our specialized AI agent is revolutionizing web vulnerability detection by combining deep learning with automated patching.",
      content: `
        <p class="mb-4">In the rapidly evolving landscape of cybersecurity, traditional scanning tools often fall short. They generate high rates of false positives and lack the context needed to understand complex attack vectors. This is where VulunSneak enters the picture.</p>
        <h3 class="text-2xl font-bold text-white mb-3 mt-6">What is VulunSneak?</h3>
        <p class="mb-4">VulunSneak is an advanced AI security agent designed to not just detect, but actively understand and remediate vulnerabilities in web applications. Unlike static analysis tools, it uses a transformer-based architecture to analyze code semantics and traffic patterns simultaneously.</p>
        <h3 class="text-2xl font-bold text-white mb-3 mt-6">Key Capabilities</h3>
        <ul class="list-disc pl-5 mb-4 space-y-2 text-gray-300">
          <li><strong>Context-Aware Detection:</strong> Reduces false positives by 60% compared to legacy scanners.</li>
          <li><strong>Auto-Patching:</strong> Generates safe, ready-to-deploy code fixes for identified issues.</li>
          <li><strong>Real-Time Monitoring:</strong> Inspects live traffic to block exploitation attempts instantly.</li>
        </ul>
        <p>By integrating VulunSneak into your CI/CD pipeline, you ensure that security is not a bottleneck but an accelerator for your development lifecycle.</p>
      `,
      author: "Ahmed Mahmoud",
      role: "Lead Security Researcher",
      date: "March 15, 2024",
      readTime: "5 min read",
      tags: ["AI Security", "Innovation", "AppSec"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
      likes: 142,
      comments: 28,
      featured: true
    },
    {
      id: 2,
      title: "Inside the Brain: How Transformer Models Detect SQLi",
      excerpt: "A technical deep dive into how VulunSneak's neural networks analyze SQL queries to pinpoint injection flaws with high precision.",
      content: "Vulun Sneak uses an advanced architecture combining deep learning and natural language processing...",
      author: "Sara Ali",
      role: "AI Engineer",
      date: "March 10, 2024",
      readTime: "7 min read",
      tags: ["Machine Learning", "SQL Injection", "Deep Learning"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&w=1200&q=80",
      likes: 89,
      comments: 15,
      featured: false
    },
    {
      id: 3,
      title: "Top 10 Critical Vulnerabilities We Detected in 2024",
      excerpt: "We analyzed over 1 million lines of code. Here are the most common security flaws found in modern web applications.",
      content: "Vulun Sneak can detect SQL injections, XSS, CSRF, buffer overflow, and many more...",
      author: "Mohamed Hassan",
      role: "Data Analyst",
      date: "March 5, 2024",
      readTime: "6 min read",
      tags: ["Report", "OWASP Top 10", "Stats"],
      image: "https://images.unsplash.com/photo-1563206767-5b1d97299337?q=80&w=2070&auto=format&fit=crop",
      likes: 65,
      comments: 12,
      featured: false
    },
    {
      id: 4,
      title: "Automating Security in CI/CD Pipelines",
      excerpt: "Stop shipping bugs. Learn how to integrate VulunSneak into GitHub Actions and GitLab CI for automated security gates.",
      content: "Vulun Sneak integrates easily with Jenkins, GitLab CI, GitHub Actions...",
      author: "Khaled Abdullah",
      role: "DevSecOps Engineer",
      date: "Feb 28, 2024",
      readTime: "8 min read",
      tags: ["DevOps", "CI/CD", "Automation"],
      image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?q=80&w=2070&auto=format&fit=crop",
      likes: 45,
      comments: 8,
      featured: false
    },
    {
      id: 5,
      title: "VulunSneak vs. Traditional SAST Tools",
      excerpt: "Benchmark comparison: Why context-aware AI outperforms static analysis in speed, accuracy, and remediation.",
      content: "The AI model outperforms traditional tools in speed, accuracy...",
      author: "Nora Said",
      role: "Product Manager",
      date: "Feb 20, 2024",
      readTime: "9 min read",
      tags: ["Comparison", "Tools", "Tech"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      likes: 31,
      comments: 7,
      featured: false
    },
    {
      id: 6,
      title: "The Future of Web Security is Autonomous",
      excerpt: "Predicting the next 5 years of cybersecurity. Will AI agents replace manual penetration testing?",
      content: "With AI evolving, systems like Vulun Sneak are expected to become a standard...",
      author: "Omar Farouk",
      role: "CTO",
      date: "Feb 15, 2024",
      readTime: "10 min read",
      tags: ["Future", "Predictions", "Vision"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      likes: 112,
      comments: 45,
      featured: true
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

  return (
    <div className="min-h-screen bg-[#05020D] text-white py-20 px-4 font-sans selection:bg-purple-500/30">
      
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
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                    Security Insights
                  </h1>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Expert articles, deep dives, and tutorials on AI-driven application security.
                  </p>
                </motion.div>
              </div>

              {/* Featured Post */}
              {posts.filter(p => p.featured)[0] && (
                <div 
                  onClick={() => handlePostClick(posts.filter(p => p.featured)[0])}
                  className="mb-16 relative group cursor-pointer rounded-3xl overflow-hidden border border-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05020D] via-[#05020D]/60 to-transparent z-10" />
                  <img 
                    src={posts.filter(p => p.featured)[0].image} 
                    alt="Featured" 
                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                    <span className="inline-block px-3 py-1 bg-purple-600 rounded-full text-xs font-bold mb-4">FEATURED</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-purple-300 transition-colors">
                      {posts.filter(p => p.featured)[0].title}
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mb-6 line-clamp-2">
                      {posts.filter(p => p.featured)[0].excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {posts.filter(p => p.featured)[0].author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {posts.filter(p => p.featured)[0].date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {posts.filter(p => p.featured)[0].readTime}
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
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {post.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md text-xs font-medium border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs text-purple-400 mb-3 font-medium">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                           <span className="font-semibold text-gray-300">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-500">
                          <button onClick={(e) => handleLike(e, post.id)} className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                            <Heart className={`w-4 h-4 ${post.likes > 20 ? "fill-pink-500 text-pink-500" : ""}`} />
                            <span className="text-xs">{post.likes}</span>
                          </button>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs">{post.readTime}</span>
                          </div>
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
                Back to Articles
              </button>

              <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-purple-900/20">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05020D] to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-xs font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    {selectedPost.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-lg">
                        {selectedPost.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{selectedPost.author}</p>
                        <p className="text-xs text-gray-400">{selectedPost.role || "Author"}</p>
                      </div>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      {selectedPost.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" />
                      {selectedPost.readTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
                
                {/* Content */}
                <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-purple-400 prose-strong:text-purple-200">
                  <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                </article>

                {/* Sidebar */}
                <aside className="space-y-6">
                  <div className="bg-[#120B2E]/50 border border-white/10 rounded-2xl p-6 sticky top-24">
                    <h3 className="font-bold text-lg mb-4 text-white">Share this article</h3>
                    <div className="flex gap-4 mb-8">
                       <button className="p-3 bg-white/5 rounded-full hover:bg-blue-500 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button>
                       <button className="p-3 bg-white/5 rounded-full hover:bg-pink-500 hover:text-white transition-colors" onClick={(e) => handleLike(e, selectedPost.id)}>
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