import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../components/ToastProvider";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/apiClient.js";

export default function AuthPage() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [tab, setTab] = useState("login"); 
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  // ----------------------- Handlers -----------------------
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

  // ----------------------- Password Strength -----------------------
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  // ----------------------- Validation -----------------------
  const validateLogin = () => {
    if (!loginForm.email) return "Email is required";
    if (!loginForm.password) return "Password is required";
    return null;
  };

  const validateRegister = () => {
    if (!registerForm.email) return "Email is required";
    if (!registerForm.firstName) return "First name is required";
    if (!registerForm.password) return "Password is required";
    if (passwordStrength < 2)
      return "Weak password — add uppercase letters, numbers, or symbols";
    return null;
  };

  // ----------------------- Submit -----------------------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const error = validateLogin();
    if (error) return showToast(error, "error");

    try {
      const data = await login(loginForm);
      sessionStorage.setItem("token", data.token);
      showToast("Login successful! 🎉");
      setLoginForm({ email: "", password: "" });
    } catch (err) {
      showToast(
        err.response?.data?.message || "Login failed",
        "error"
      );
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const error = validateRegister();
    if (error) return showToast(error, "error");

    // Mapping frontend → backend fields
    const payload = {
      Fname: registerForm.firstName,
      Lname: registerForm.lastName,
      Email: registerForm.email,
      Password: registerForm.password,
      Age: Number(registerForm.age),
      Gender: registerForm.gender === "male", // true/false
      Phone: registerForm.phone,
      Address: registerForm.address,
    };

    try {
      await register(payload);
      showToast("Registration successful! 🎉");

      setRegisterForm({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
      });

      setPasswordStrength(0);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Registration failed",
        "error"
      );
    }
  };

  // ----------------------- Form Variants -----------------------
  const formVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  // ----------------------- UI -----------------------
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

              <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-xl text-white font-semibold text-lg shadow-xl">
                Login
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

              {/* Password Strength Meter */}
              <div className="relative">
                <motion.div className="w-full h-2 bg-gray-700/50 rounded-xl overflow-hidden" initial={false}>
                  <motion.div
                    className="h-full rounded-xl"
                    animate={{
                      width:
                        passwordStrength === 0
                          ? "0%"
                          : passwordStrength === 1
                          ? "25%"
                          : passwordStrength === 2
                          ? "50%"
                          : passwordStrength === 3
                          ? "75%"
                          : "100%",
                      backgroundColor:
                        passwordStrength === 0
                          ? "#00000000"
                          : passwordStrength === 1
                          ? "#f56565"
                          : passwordStrength === 2
                          ? "#ecc94b"
                          : passwordStrength === 3
                          ? "#4299e1"
                          : "#48bb78",
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>

                <motion.p
                  className="mt-1 text-sm font-semibold"
                  animate={{
                    color:
                      passwordStrength === 0
                        ? "#f56565"
                        : passwordStrength === 1
                        ? "#f56565"
                        : passwordStrength === 2
                        ? "#ecc94b"
                        : passwordStrength === 3
                        ? "#4299e1"
                        : "#48bb78",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {passwordStrength === 0
                    ? ""
                    : passwordStrength === 1
                    ? "Weak"
                    : passwordStrength === 2
                    ? "Medium"
                    : passwordStrength === 3
                    ? "Strong"
                    : "Very Strong"}
                </motion.p>
              </div>

              <Input label="Age" name="age" type="number" value={registerForm.age} onChange={handleRegisterChange} />

              <select name="gender" value={registerForm.gender} onChange={handleRegisterChange} className="w-full p-3 bg-[#1e1e2e] border border-purple-700/50 rounded-xl text-gray-100 outline-none">
                <option value="">Select Gender</option>
                <option value="male" className="text-gray-900">Male</option>
                <option value="female" className="text-gray-900">Female</option>
              </select>

              <Input label="Phone" name="phone" value={registerForm.phone} onChange={handleRegisterChange} />
              <Input label="Address" name="address" value={registerForm.address} onChange={handleRegisterChange} />

              <button type="submit" className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-xl text-white font-semibold text-lg shadow-xl">
                Register
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
          <button onClick={() => navigate("/")} className="text-gray-400 hover:text-purple-400 text-sm underline">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------- Input Components -------------------------------
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
      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-300"
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>
  );
}
