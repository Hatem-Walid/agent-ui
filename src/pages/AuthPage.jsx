import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../components/ToastProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { login, register } from "../api/apiClient.js";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();

  const planId = location.state?.planId;
  const from = location.state?.from?.pathname || "/ai";

  const [tab, setTab] = useState("login"); 

  // useEffect(() => {
  //   if (tab === "register" && !planId) {
  //      // لو عايز تجبره يختار خطة فعل السطر ده، لو مش عايز سيبه
  //      showToast("Please choose a plan first", "warning");
  //      navigate("/plan"); 
  //   }
  // }, [tab, planId, navigate]);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    Email: "",
    FName: "",
    LName: "",
    Password: "",
    Age: "",
    Gender: "",
    Phone: "",
    Address: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Handlers ---
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setPasswordStrength(getPasswordStrength(value));
  };
  
  const togglePassword = () => setShowPassword((prev) => !prev);

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  // --- Submit Logic (تم التعديل لمطابقة الباك إند) ---

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!loginForm.email || !loginForm.password) return showToast("Required fields", "error");

    setIsSubmitting(true);
    try {
      // 1. الداتا بتتبعت للباك إند
      const response = await login(loginForm); 
      console.log("Full login response:", response);
      // الـ login function عندك في الـ apiClient غالباً بترجع response.data
      const data = response.data || response; 
    console.log("Login response data:", data);
 const userName = data.Name || data.name || data.FullName || "User";
 const email = data.Email || data.email || "email not get";
      // 2. حسب كود الباك إند، الرد فيه: { token: "...", Name: "Hatem Ali", expiration: "..." }
      // لاحظ إن الاسم جاي في مفتاح اسمه "Name" والحرف الأول Capital
      
      authLogin(data.token, userName, email); // استخدمنا Name من الباك إند

      showToast("Login successful! 🎉");
      navigate(from, { replace: true });

    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Login failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!registerForm.email) return showToast("Email required", "error");

    setIsSubmitting(true);

    // 🔴🔴 أهم خطوة: تحويل البيانات لنفس أسماء الـ DTO في C#
    const payload = {
      Fname: registerForm.firstName,  // C# Property: Fname
      Lname: registerForm.lastName,   // C# Property: Lname
      Email: registerForm.email,      // C# Property: Email
      Password: registerForm.password, // C# Property: Password
      Age: Number(registerForm.age),  // C# Property: Age (int)
      Gender: registerForm.gender,    // C# Property: Gender (string) - بعتناها زي ما هي "male" مش boolean
      Phone: registerForm.phone,      // C# Property: Phone
      Address: registerForm.address,  // C# Property: Address
      // PlanId: planId // بما ان الباك إند مغيرناهوش ومش بيستقبل PlanId، السطر ده مش هيأثر بس مش هيتحفظ
    };

    try {
      await register(payload);
      showToast("Registration successful! Please Login.");
      setTab("login"); // نقلبه لصفحة اللوجن عشان يدخل
      setRegisterForm({ email: "", firstName: "", lastName: "", password: "", age: "", gender: "", phone: "", address: "" });
      setPasswordStrength(0);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || "Registration failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  // --- UI ---
  // نفس الـ JSX بتاعك بالظبط
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f0f1a]">
      <div className="w-full max-w-lg bg-[#151525]/90 backdrop-blur-xl border border-purple-700/30 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          {tab === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <AnimatePresence mode="wait">
          {tab === "login" ? (
            <motion.form
              key="login"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={formVariants}
              onSubmit={handleLoginSubmit}
              className="space-y-4"
            >
              <Input label="Email *" name="email" type="email" value={loginForm.email} onChange={handleLoginChange} required />
              <PasswordInput
                label="Password *"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                showPassword={showPassword}
                togglePassword={togglePassword}
              />
              <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-xl text-white font-semibold text-lg shadow-xl">
                {isSubmitting ? "Processing..." : "Login"}
              </button>
              <div className="text-center text-gray-400 text-sm mt-2">
                Don’t have an account?{" "}
                <button type="button" onClick={() => setTab("register")} className="text-purple-400 hover:text-purple-300">
                  Register here
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={formVariants}
              onSubmit={handleRegisterSubmit}
              className="space-y-4"
            >
              <Input label="Email *" name="email" type="email" value={registerForm.email} onChange={handleRegisterChange} required />
              <Input label="First Name *" name="firstName" value={registerForm.firstName} onChange={handleRegisterChange} required />
              <Input label="Last Name" name="lastName" value={registerForm.lastName} onChange={handleRegisterChange} />
              <PasswordInput
                label="Password *"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                showPassword={showPassword}
                togglePassword={togglePassword}
              />
              {/* Strength Bar Code */}
              <div className="relative">
                <motion.div className="w-full h-2 bg-gray-700/50 rounded-xl overflow-hidden" initial={false}>
                  <motion.div
                    className="h-full rounded-xl"
                    animate={{
                      width: ["0%", "25%", "50%", "75%", "100%"][passwordStrength] || "0%",
                      backgroundColor: ["transparent", "#f56565", "#ecc94b", "#4299e1", "#48bb78"][passwordStrength]
                    }}
                  />
                </motion.div>
              </div>

              <Input label="Age" name="age" type="number" value={registerForm.age} onChange={handleRegisterChange} />
              <select name="gender" value={registerForm.gender} onChange={handleRegisterChange} className="w-full p-3 bg-[#1e1e2e] border border-purple-700/50 rounded-xl text-gray-100 outline-none">
                <option value="">Select Gender</option>
                <option value="Male" className="text-black">Male</option> {/* القيمة بقت String Capitalized زي ما C# بتحب */}
                <option value="Female" className="text-black">Female</option>
              </select>
              <Input label="Phone" name="phone" value={registerForm.phone} onChange={handleRegisterChange} />
              <Input label="Address" name="address" value={registerForm.address} onChange={handleRegisterChange} />

              <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-xl text-white font-semibold text-lg shadow-xl">
                {isSubmitting ? "Processing..." : "Register"}
              </button>
              <div className="text-center text-gray-400 text-sm mt-2">
                Already have an account?{" "}
                <button type="button" onClick={() => setTab("login")} className="text-purple-400 hover:text-purple-300">
                  Login here
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
        <div className="text-center mt-4">
            <button onClick={() => navigate("/")} className="text-gray-400 hover:text-purple-400 text-sm underline">Back to Home</button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-gray-300 mb-1 block">{label}</label>
      <input {...props} className="w-full p-3 bg-[#1e1e2e] border border-purple-700/50 rounded-xl text-gray-100 outline-none placeholder-gray-400" />
    </div>
  );
}

function PasswordInput({ label, value, onChange, name, showPassword, togglePassword }) {
  return (
    <div className="relative">
      <label className="text-gray-300 mb-1 block">{label}</label>
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-[#1e1e2e] border border-purple-700/50 rounded-xl text-gray-100 outline-none placeholder-gray-400"
      />
      <button type="button" onClick={togglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>
  );
}