import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Loader2, Github, Twitter, Linkedin } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال البيانات
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#05020D] text-white py-20 px-4 relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 mt-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about VulunSneak? Need a custom enterprise plan? 
            Our team is ready to help you secure your applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Info Card */}
            <div className="bg-[#120B2E]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4 group/item">
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover/item:bg-purple-500/20 transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Our Location</h3>
                    <p className="text-gray-400">127 Qaomia Street, ZAG City, Egypt</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover/item:bg-blue-500/20 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Phone Number</h3>
                    <p className="text-gray-400">+20 127 929 3585</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 group-hover/item:bg-pink-500/20 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Email Address</h3>
                    <p className="text-gray-400">contact@vulunsneak.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-purple-600 hover:border-purple-500 hover:scale-110 transition-all duration-300 text-gray-400 hover:text-white"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#120B2E]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                <Send className="w-24 h-24 text-purple-500 transform rotate-12" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Send a Message</h2>
              <p className="text-gray-400 mb-8 text-sm">We usually respond within 24 hours.</p>
              
              <div className="space-y-5">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#05020D]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#05020D]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Your Message</label>
                  <textarea
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-[#05020D]/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-sm"
        >
          <p className="mb-2">© {new Date().getFullYear()} VulunSneak. All Rights Reserved.</p>
          <p className="flex items-center justify-center gap-1">
            Designed with <span className="text-purple-500">💜</span> by VulnSneak Team
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default ContactUs;