import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../components/ToastProvider";
import { login, register } from "../api/apiClient.js";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();

  const from = location.state?.from?.pathname || "/ai";

  const [tab, setTab] = useState("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "", firstName: "", lastName: "", password: "", age: "", gender: "", phone: "", address: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await login(loginForm);
      const data = response.data || response;
      const userName = data.Name || data.name || "User";
      authLogin(data.token, userName, data.email);
      showToast("Welcome back! 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      showToast(err.response?.data?.message || "Login failed", "error");
    } finally { setIsSubmitting(false); }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const payload = {
      Fname: registerForm.firstName, Lname: registerForm.lastName, Email: registerForm.email,
      Password: registerForm.password, Age: Number(registerForm.age), Gender: registerForm.gender === "Male",
      Phone: registerForm.phone, Address: registerForm.address,
    };
    try {
      await register(payload);
      showToast("Registration successful! Please login.");
      setTab("login");
    } catch (err) {
      showToast(err.response?.data?.message || "Registration failed", "error");
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-black">
      
      {/* 1. الصورة كخلفية مع زيادة الإضاءة */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: `url('public/assets/AUTH_BG.png')` }} // تأكد أن الصورة في مجلد public
      >
        {/* طبقة لزيادة الإضاءة (Light Overlay) */}
        <div className="absolute inset-0 bg-purple-500/10 backdrop-brightness-110"></div>
      </div>

      <style>{`
        @keyframes rotate-beam { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .border-beam-calm::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: conic-gradient(transparent, transparent, transparent, rgba(168, 85, 247, 0.3), rgba(255, 255, 255, 0.1), transparent);
          animation: rotate-beam 8s linear infinite;
        }
      `}</style>

      {/* 2. الكرت الزجاجي (Glass) */}
      <div className="relative z-10 w-full max-w-[450px] rounded-[40px] overflow-hidden p-[1.5px] border-beam-calm shadow-2xl shadow-purple-900/20">
        <div className="relative z-20 w-full bg-white/[0.05] backdrop-blur-[30px] rounded-[38.5px] p-8 md:p-10 border border-white/10">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-2">
              {tab === "login" ? "Welcome" : "Get Started"}
            </h2>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">For designers</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={tab === "login" ? handleLoginSubmit : handleRegisterSubmit}
              className="space-y-4"
            >
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={tab === "login" ? loginForm.email : registerForm.email}
                onChange={tab === "login" ? handleLoginChange : handleRegisterChange}
                required
              />

              {tab === "register" && (
                <div className="grid grid-cols-2 gap-3">
                  <Input label="First Name" name="firstName" value={registerForm.firstName} onChange={handleRegisterChange} required />
                  <Input label="Last Name" name="lastName" value={registerForm.lastName} onChange={handleRegisterChange} />
                </div>
              )}

              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={tab === "login" ? loginForm.password : registerForm.password}
                  onChange={tab === "login" ? handleLoginChange : handleRegisterChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 bottom-3 text-white/20 hover:text-white/50 text-[10px] tracking-widest"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              {tab === "register" && (
                 <div className="grid grid-cols-2 gap-3">
                    <Input label="Age" name="age" type="number" value={registerForm.age} onChange={handleRegisterChange} />
                    <div className="flex flex-col gap-1">
                      <label className="text-white/30 text-[10px] uppercase ml-4 tracking-widest">Gender</label>
                      <select name="gender" value={registerForm.gender} onChange={handleRegisterChange} className="w-full bg-white/[0.03] border border-white/10 p-3 px-5 rounded-full text-white/80 outline-none text-sm focus:border-white/20 transition-all appearance-none cursor-pointer">
                        <option value="" className="bg-[#0f0f15]">Select</option>
                        <option value="Male" className="bg-[#0f0f15]">Male</option>
                        <option value="Female" className="bg-[#0f0f15]">Female</option>
                      </select>
                    </div>
                 </div>
              )}

              {/* الأزرار نصف دائرية (rounded-full) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-6 bg-white text-black font-bold rounded-full hover:bg-opacity-90 transition-all active:scale-[0.97] shadow-lg text-xs tracking-[0.2em]"
              >
                {isSubmitting ? "PROCESSING..." : tab === "login" ? "LOG IN" : "SIGN UP"}
              </button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-8 text-center">
            <button
              onClick={() => setTab(tab === "login" ? "register" : "login")}
              className="text-white/30 hover:text-white/60 text-[10px] tracking-[0.15em] transition-colors"
            >
              {tab === "login" ? "CREATE AN ACCOUNT" : "I HAVE AN ACCOUNT"}
            </button>
          </div>
          
          <button onClick={() => navigate("/")} className="w-full mt-6 text-white/10 hover:text-white/30 text-[9px] tracking-[0.5em] transition-all">
            EXIT
          </button>
        </div>
      </div>
    </div>
  );
}

// مكون المدخلات (نصف دائري rounded-full)
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-white/30 text-[10px] uppercase tracking-widest ml-4 font-light">{label}</label>
      <input
        {...props}
        className="w-full bg-white/[0.03] border border-white/10 p-3 px-5 rounded-full text-white outline-none focus:bg-white/[0.06] focus:border-white/30 transition-all placeholder:text-white/5 text-sm font-light"
      />
    </div>
  );
}