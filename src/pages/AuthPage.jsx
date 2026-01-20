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
      
      {/* استدعاء خط Syncopate */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');
        
        @keyframes rotate-beam { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .border-beam-calm::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: conic-gradient(transparent, transparent, transparent, rgba(168, 85, 247, 0.3), rgba(255, 255, 255, 0.1), transparent);
          animation: rotate-beam 8s linear infinite;
        }
        .syncopate { font-family: 'Syncopate', sans-serif; }
      `}</style>

      {/* الصورة كخلفية */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/assets/AUTH_BG.png')` }} 
      >
        <div className="absolute inset-0 bg-purple-500/10 backdrop-brightness-125"></div>
      </div>

      {/* الكرت الزجاجي */}
      <div className="relative z-10 w-full max-w-[450px] rounded-[40px] overflow-hidden p-[1.5px] border-beam-calm shadow-2xl">
        <div className="relative z-20 w-full bg-white/[0.06] backdrop-blur-[35px] rounded-[38.5px] p-8 md:p-10 border border-white/10">
          
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white tracking-[0.3em] uppercase syncopate mb-3">
              {tab === "login" ? "VULNSNEAK" : "REGISTER"}
            </h2>
            {/* جعلنا كلمة For designers أوضح قليلاً */}
            <p className="text-white/70 text-[9px] uppercase tracking-[0.5em] font-medium">For developers</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={tab === "login" ? handleLoginSubmit : handleRegisterSubmit}
              className="space-y-5"
            >
              <Input
                label="Email Address"
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
                  className="absolute right-6 bottom-3.5 text-white/50 hover:text-white transition-all text-[10px] font-bold tracking-widest"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              {tab === "register" && (
                 <div className="grid grid-cols-2 gap-3">
                    <Input label="Age" name="age" type="number" value={registerForm.age} onChange={handleRegisterChange} />
                    <div className="flex flex-col gap-1.5">
                      {/* الـ label هنا أيضاً أصبح أوضح */}
                      <label className="text-white/80 text-[10px] uppercase ml-5 tracking-widest font-semibold">Gender</label>
                      <select name="gender" value={registerForm.gender} onChange={handleRegisterChange} className="w-full bg-white/[0.05] border border-white/10 p-3 px-5 rounded-full text-white/90 outline-none text-sm focus:border-white/30 transition-all appearance-none cursor-pointer">
                        <option value="" className="bg-[#111]">Select</option>
                        <option value="Male" className="bg-[#111]">Male</option>
                        <option value="Female" className="bg-[#111]">Female</option>
                      </select>
                    </div>
                 </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all active:scale-[0.97] shadow-xl text-xs tracking-[0.3em] syncopate"
              >
                {isSubmitting ? "..." : tab === "login" ? "LOG IN" : "SIGN UP"}
              </button>
            </motion.form>
          </AnimatePresence>

          <div className="mt-10 text-center">
            <button
              onClick={() => setTab(tab === "login" ? "register" : "login")}
              className="text-white/60 hover:text-white text-[9px] tracking-[0.2em] transition-colors font-bold"
            >
              {tab === "login" ? "CREATE AN ACCOUNT" : "ALREADY HAVE AN ACCOUNT"}
            </button>
          </div>
          
          <button onClick={() => navigate("/")} className="w-full mt-6 text-white/20 hover:text-white/40 text-[8px] tracking-[0.6em] transition-all">
            EXIT SYSTEM
          </button>
        </div>
      </div>
    </div>
  );
}

// مكون المدخلات المحدث بـ Labels أكثر بياضاً
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* تغيير text-white/30 إلى text-white/80 و font-semibold لزيادة الوضوح */}
      <label className="text-white/80 text-[10px] uppercase tracking-[0.15em] ml-5 font-semibold">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-white/[0.04] border border-white/10 p-3.5 px-6 rounded-full text-white outline-none focus:bg-white/[0.08] focus:border-white/30 transition-all placeholder:text-white/20 text-sm font-light"
      />
    </div>
  );
}