import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient.js";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  // 🧠 وظيفة عامة للتعامل مع إدخال المستخدم
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 📤 الإرسال الفعلي للـ API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/Auth/login" : "/Auth/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.username, email: formData.email, password: formData.password };

      const res = await apiClient.post(endpoint, payload);

      console.log("✅ Response:", res.data);

      // لو رجع توكن أو نجاح
      if (res.data.token) {
        alert("✅ Auth successful!");
        navigate("/agent"); // بعد النجاح يدخل عالصفحة بتاعة الAgent
      }
    } catch (error) {
      console.error("❌ Auth error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f1a] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-indigo-700/20 to-purple-900/30 blur-3xl"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      ></motion.div>

      <div className="relative z-10 bg-[#151525]/90 border border-purple-700/30 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-400">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h1>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {!isLogin && (
              <div>
                <label className="block text-sm text-gray-300 mb-1">Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2 bg-[#1e1e2e] border border-purple-700/50 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-100 outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="w-full px-4 py-2 bg-[#1e1e2e] border border-purple-700/50 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-100 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="w-full px-4 py-2 bg-[#1e1e2e] border border-purple-700/50 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-100 outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition duration-300"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </motion.form>
        </AnimatePresence>

        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 text-gray-400 hover:text-purple-400 text-sm underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
