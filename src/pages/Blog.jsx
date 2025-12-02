import React, { useState } from "react";
import { 
  FaCalendarAlt, 
} from "react-icons/fa";

const BlogPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Introduction to Vulun Sneak: Revolution in Web Vulnerability Detection",
      excerpt: "Discover how Vulun Sneak changes the way web app vulnerabilities are detected using advanced AI.",
      content: "Vulun Sneak is an advanced AI model designed to automatically detect security vulnerabilities in web applications...",
      author: "Ahmed Mahmoud",
      date: "March 15, 2024",
      readTime: "5 min read",
      tags: ["Cybersecurity", "AI", "Web Apps"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&w=1200&q=80",
      likes: 42,
      comments: 8,
      featured: true
    },
    {
      id: 2,
      title: "How AI Model Detects Vulnerabilities",
      excerpt: "Detailed explanation of how Vulun Sneak analyzes code to find security weaknesses.",
      content: "Vulun Sneak uses an advanced architecture combining deep learning and natural language processing...",
      author: "Sara Ali",
      date: "March 10, 2024",
      readTime: "7 min read",
      tags: ["Machine Learning", "Data Analysis", "Neural Networks"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=tinysrgb&w=1200&q=80",
      likes: 28,
      comments: 5,
      featured: true
    },
    {
      id: 3,
      title: "Top 10 Vulnerabilities Vulun Sneak Can Detect",
      excerpt: "A list of critical vulnerabilities that Vulun Sneak can detect and protect your apps from.",
      content: "Vulun Sneak can detect SQL injections, XSS, CSRF, buffer overflow, and many more, with up to 98% accuracy...",
      author: "Mohamed Hassan",
      date: "March 5, 2024",
      readTime: "6 min read",
      tags: ["Security", "OWASP", "Protection"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&w=1200&q=80",
      likes: 35,
      comments: 12,
      featured: false
    },
    {
      id: 4,
      title: "Integrating Vulun Sneak in Modern Workflows",
      excerpt: "A practical guide to integrating automated vulnerability detection into CI/CD pipelines.",
      content: "Vulun Sneak integrates easily with Jenkins, GitLab CI, GitHub Actions, enabling automated scanning in each stage...",
      author: "Khaled Abdullah",
      date: "Feb 28, 2024",
      readTime: "8 min read",
      tags: ["DevOps", "CI/CD", "Integration"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&w=1200&q=80",
      likes: 19,
      comments: 3,
      featured: false
    },
    {
      id: 5,
      title: "Vulun Sneak vs Traditional Tools",
      excerpt: "Compare AI-powered detection with traditional tools like Burp Suite and OWASP ZAP.",
      content: "The AI model outperforms traditional tools in speed, accuracy, and ability to learn new vulnerabilities...",
      author: "Nora Said",
      date: "Feb 20, 2024",
      readTime: "9 min read",
      tags: ["Comparison", "Tools", "Tech"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&w=1200&q=80",
      likes: 31,
      comments: 7,
      featured: false
    },
    {
      id: 6,
      title: "Future of Web Security with AI",
      excerpt: "A futuristic look at how AI changes cybersecurity landscape.",
      content: "With AI evolving, systems like Vulun Sneak are expected to become a standard in web app security...",
      author: "Omar Farouk",
      date: "Feb 15, 2024",
      readTime: "10 min read",
      tags: ["Future", "Predictions", "Tech"],
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?crop=entropy&cs=tinysrgb&w=1200&q=80",
      likes: 47,
      comments: 15,
      featured: true
    },
 
  {
    id: 7,
    title: "Deep Dive into SQL Injection Detection",
    excerpt: "Learn how Vulun Sneak identifies SQL injection patterns effectively.",
    content: "The AI model examines code patterns to detect potential SQL injection points in real time...",
    author: "Layla Ibrahim",
    date: "Feb 10, 2024",
    readTime: "6 min read",
    tags: ["SQL", "Injection", "Security"],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDp71a-fyLYckBm-ysD72VD6mpOqHqYKEn_b8yjqZ945or-f1KlpU5OVson-Vz1UUm43A&usqp=CAU",
    likes: 25,
    comments: 4,
    featured: false
  },
  {
    id: 8,
    title: "Cross-Site Scripting Explained",
    excerpt: "Understand XSS attacks and how Vulun Sneak detects them.",
    content: "Vulun Sneak recognizes unsafe scripts and prevents client-side attacks efficiently...",
    author: "Hassan Ali",
    date: "Feb 5, 2024",
    readTime: "7 min read",
    tags: ["XSS", "Web Security", "Prevention"],
    image: "https://escape.tech/blog/content/images/2022/06/XSS_Escape.png",
    likes: 30,
    comments: 6,
    featured: false
  },
  {
    id: 9,
    title: "Understanding CSRF Attacks",
    excerpt: "Comprehensive guide on CSRF and AI detection methods.",
    content: "Vulun Sneak analyzes token patterns and request origins to mitigate CSRF vulnerabilities...",
    author: "Mona Khaled",
    date: "Jan 30, 2024",
    readTime: "8 min read",
    tags: ["CSRF", "AI Security", "Web Apps"],
    image: "https://i.imgur.com/AAE1HrE.gif",
    likes: 21,
    comments: 5,
    featured: false
  }

  ]);

  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => setSelectedPost(post);
  const handleBackToList = () => setSelectedPost(null);
  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
    if (selectedPost && selectedPost.id === postId) setSelectedPost({...selectedPost, likes: selectedPost.likes + 1});
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vulun Sneak <span className="text-purple-500 animate-pulse">Blog</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Latest articles about AI-powered web vulnerability detection.
          </p>
        </div>

        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.id} className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#333] hover:border-purple-500 transition-all cursor-pointer group"
                   onClick={() => handlePostClick(post)}>
                <div className="relative h-48">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-500 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="flex items-center gap-1"><FaCalendarAlt /> {post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Single post view coming soon...</div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
