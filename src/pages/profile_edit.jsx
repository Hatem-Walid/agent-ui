import React, { useState, useEffect } from "react";
import { 
  Home, User, Settings, Pencil, ChevronLeft, 
  CheckCircle2, Loader2, Lock, KeyRound, Trash2, AlertTriangle, X 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/apiClient";
import toast, { Toaster } from "react-hot-toast"; // للمنبثقات السريعة
import { motion, AnimatePresence } from "framer-motion"; // للحركات الناعمة

const ProfileEdit = () => {
  const { user, setUser, logout } = useAuth(); 
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // حالة نافذة الحذف

  const [formData, setFormData] = useState({
    fname: "", lname: "", email: "", address: "", phone: "", age: "", gender: "-select-",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "", newPassword: "", confirmPassword: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setInitialLoading(true);
        const response = await apiClient.get("api/v1/User");
        const data = response.data;
        setFormData({
          fname: data.fname || "",
          lname: data.lname || "",
          email: data?.email || data?.Email || "Not Available", 
          address: data.address || "",
          phone: data.phone || "",
          age: data.age || "",
          gender: data.gender === true ? "Male" : data.gender === false ? "Female" : "-select-",
        });
        if (typeof setUser === "function") setUser(prev => ({ ...prev, ...data }));
      } catch (error) {
        toast.error("Failed to sync profile data.");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchUserData();
  }, [user?.email]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // --- حفظ البيانات ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const tId = toast.loading("Saving changes...");
    setLoading(true);
    let gValue = formData.gender === "Male" ? true : formData.gender === "Female" ? false : null;

    try {
      await apiClient.put("api/v1/User", {
        fname: formData.fname, lname: formData.lname, address: formData.address,
        phone: formData.phone, age: formData.age ? parseInt(formData.age) : null, gender: gValue,
      });
      toast.success("Profile updated! ✨", { id: tId });
    } catch (error) {
      toast.error("Update failed. Try again.", { id: tId });
    } finally { setLoading(false); }
  };

  // --- تغيير الباسورد ---
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    const tId = toast.loading("Updating security...");
    try {
      await apiClient.put("api/v1/User/change-password", passwordData);
      toast.success("Password secured! 🔒", { id: tId });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error changing password", { id: tId });
    }
  };

  // --- لوجيك الحذف النهائي ---
  const confirmDeleteAccount = async () => {
    const tId = toast.loading("Deleting your records...");
    try {
      await apiClient.delete("api/v1/User");
      toast.success("Account permanently deleted.", { id: tId });
      setShowDeleteModal(false);
      logout();
      navigate("/auth");
    } catch (error) {
      toast.error("Process failed.", { id: tId });
    }
  };

  if (initialLoading) {
    return <div className="h-screen w-full flex items-center justify-center bg-white font-black text-purple-700 animate-pulse text-xl">INITIALIZING...</div>;
  }

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans relative">
      <Toaster position="top-right" />

      {/* --- CUSTOM DELETE MODAL (POP-UP) --- */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDeleteModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-md rounded-4xl p-8 shadow-2xl border border-red-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600"><AlertTriangle size={32} /></div>
                <button onClick={() => setShowDeleteModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20}/></button>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Are you absolutely sure?</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">This action cannot be undone. This will permanently delete your account and remove all your data from our servers.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all">Cancel</button>
                <button onClick={confirmDeleteAccount} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all">Yes, Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SIDEBAR RAIL --- */}
      <div className="w-20 bg-black flex flex-col items-center py-8 justify-between shrink-0">
        <div className="flex flex-col items-center gap-10">
          <div className="text-white"><div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center font-bold">V</div></div>
          <button onClick={() => navigate("/")} className="text-gray-500 hover:text-purple-400"><Home size={24} /></button>
          <button className="text-purple-500 bg-purple-500/10 p-2 rounded-xl border border-purple-500/20"><User size={24} /></button>
        </div>
        <button className="w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center text-white"><Settings size={24} /></button>
      </div>

      {/* --- MENU SIDEBAR --- */}
      <div className="w-64 bg-white border-r border-gray-200 p-8 shrink-0">
        <div onClick={() => navigate(-1)} className="flex items-center gap-2 text-black mb-12 cursor-pointer hover:text-purple-700 transition-all"><ChevronLeft size={20} /><span className="font-bold text-xl tracking-tight">settings</span></div>
        <div className="flex items-center gap-3 text-black font-bold text-lg bg-purple-50 p-4 rounded-2xl border-l-4 border-purple-700">
          <Pencil size={18} className="text-purple-700" />
          <span>Edit profile</span>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 bg-white overflow-y-auto p-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Edit profile</h1>
          <p className="text-gray-500 mb-10 text-sm italic">Manage your digital identity and security settings.</p>

          {/* SECTION: BASIC INFO */}
          <form onSubmit={handleSaveProfile} className="space-y-6 mb-16 pb-12 border-b-2 border-gray-100">
            <h2 className="text-lg font-bold text-purple-700 flex items-center gap-2 mb-4"><User size={20}/> Basic Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">First Name</label><input type="text" name="fname" value={formData.fname} onChange={handleFormChange} className="w-full border-2 border-gray-300 rounded-xl p-3.5 focus:border-purple-600 outline-none" /></div>
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Last Name</label><input type="text" name="lname" value={formData.lname} onChange={handleFormChange} className="w-full border-2 border-gray-300 rounded-xl p-3.5 focus:border-purple-600 outline-none" /></div>
            </div>
            <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Email (Verified)</label><div className="relative"><input type="email" value={formData.email} disabled className="w-full border-2 border-gray-200 bg-gray-50 rounded-xl p-3.5 text-gray-400 font-medium" /><Lock className="absolute right-4 top-4 text-gray-300" size={18} /></div></div>
            <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Address</label><input type="text" name="address" value={formData.address} onChange={handleFormChange} className="w-full border-2 border-gray-300 rounded-xl p-3.5 focus:border-purple-600 outline-none" /></div>
            <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Phone</label><input type="text" name="phone" value={formData.phone} onChange={handleFormChange} className="w-full border-2 border-gray-300 rounded-xl p-3.5 focus:border-purple-600 outline-none" /></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Age</label><input type="number" name="age" value={formData.age} onChange={handleFormChange} className="w-full border-2 border-gray-300 rounded-xl p-3.5 outline-none focus:border-purple-600" /></div>
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Gender</label><select name="gender" value={formData.gender} onChange={handleFormChange} className="w-full border-2 border-gray-300 rounded-xl p-3.5 outline-none focus:border-purple-600 appearance-none bg-position-[right_1rem_center] bg-no-repeat bg-size-[1em] bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]"><option value="-select-">-select-</option><option value="Male">Male</option><option value="Female">Female</option></select></div>
            </div>
            <button type="submit" className="px-10 py-3.5 bg-purple-700 text-white rounded-2xl font-bold hover:bg-purple-800 shadow-lg active:scale-95 transition-all">Save Profile Info</button>
          </form>

          {/* SECTION: PASSWORD CHANGE */}
          <form onSubmit={handleUpdatePassword} className="space-y-6 mb-16 pb-12 border-b-2 border-gray-100">
            <h2 className="text-lg font-bold text-purple-700 flex items-center gap-2 mb-4"><KeyRound size={20}/> Change Password</h2>
            <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Current Password</label><input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required className="w-full border-2 border-gray-300 rounded-xl p-3.5 focus:border-purple-600 outline-none" /></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">New Password</label><input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required className="w-full border-2 border-gray-300 rounded-xl p-3.5 focus:border-purple-600 outline-none" /></div>
              <div className="space-y-2"><label className="text-sm font-bold text-gray-700">Confirm Password</label><input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required className="w-full border-2 border-gray-300 rounded-xl p-3.5 focus:border-purple-600 outline-none" /></div>
            </div>
            <button type="submit" className="px-10 py-3.5 border-2 border-purple-700 text-purple-700 rounded-2xl font-bold hover:bg-purple-50 active:scale-95 transition-all">Update Password</button>
          </form>

          {/* SECTION: DANGER ZONE */}
          <div className="p-8 border-2 border-red-100 bg-red-50/30 rounded-4xl">
             <h2 className="text-lg font-black text-red-600 flex items-center gap-2 mb-2"><AlertTriangle size={20}/> Danger Zone</h2>
             <p className="text-sm text-gray-600 mb-6">Deleting your account is permanent and cannot be undone. All your chat history will be lost.</p>
             <button type="button" onClick={() => setShowDeleteModal(true)} className="px-8 py-3.5 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 shadow-lg shadow-red-200 active:scale-95 transition-all flex items-center gap-2"><Trash2 size={18}/> Delete My Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;