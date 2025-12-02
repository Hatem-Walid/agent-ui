import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Thanks for contacting us.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e0e0e0] py-16 px-4 relative overflow-hidden ">
      {/* Blurry Neon Vibe Background */}
      <div className="absolute inset-0 -z-10 ">
        <div className="absolute w-72 h-72 bg-[#9b59b6] rounded-full top-[-100px] left-[-100px] blur-3xl opacity-40 animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute w-96 h-96 bg-[#3498db] rounded-full bottom-[-150px] right-[-150px] blur-3xl opacity-30 animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute w-64 h-64 bg-[#e74c3c] rounded-full top-[30%] right-[-80px] blur-3xl opacity-20 animate-[pulse_7s_ease-in-out_infinite]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 mt-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-[#9b59b6] animate-pulse">
            Contact Us
          </h1>
          <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
            We'd love to hear from you! Send us a message or find our contact details below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#9b59b6]/30 shadow-[0_0_30px_#9b59b6]/20 backdrop-blur-md transition-all"
          >
            <h2 className="text-3xl font-bold text-[#9b59b6] mb-6">Send a Message</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#0d0d0d] border border-[#9b59b6]/50 rounded-xl py-3 px-4 mb-4 text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#9b59b6]/50 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#0d0d0d] border border-[#9b59b6]/50 rounded-xl py-3 px-4 mb-4 text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#9b59b6]/50 transition"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full bg-[#0d0d0d] border border-[#9b59b6]/50 rounded-xl py-3 px-4 mb-6 text-[#e0e0e0] focus:outline-none focus:ring-2 focus:ring-[#9b59b6]/50 transition resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#9b59b6] text-white py-3 rounded-xl font-bold hover:bg-[#7d3ea6] transition-colors shadow-[0_0_20px_#9b59b6]/40"
            >
              Send Message
            </button>
          </form>

          {/* Contact Details */}
          <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#9b59b6]/30 shadow-[0_0_30px_#9b59b6]/20 backdrop-blur-md transition-all flex flex-col justify-center gap-6">
            <h2 className="text-3xl font-bold text-[#9b59b6] mb-6">Contact Information</h2>
            <div className="flex items-center gap-4 text-[#e0e0e0]">
              <FaMapMarkerAlt className="text-[#9b59b6] w-6 h-6" />
              <span>127 Balm Street  , ZAG City </span>
            </div>
            <div className="flex items-center gap-4 text-[#e0e0e0]">
              <FaPhoneAlt className="text-[#9b59b6] w-6 h-6" />
              <span>+20 127 929 3585</span>
            </div>
            <div className="flex items-center gap-4 text-[#e0e0e0]">
              <FaEnvelope className="text-[#9b59b6] w-6 h-6" />
              <span>contact@vulunsneak.com</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-12 text-center text-[#a0a0a0]">
          <p className="mb-4">© {new Date().getFullYear()} VulunSneak. All Rights Reserved.</p>
          <p className="text-sm">Designed with VulnSneak Team 💜</p>
        </footer>
      </div>
    </div>
  );
};

export default ContactUs;
