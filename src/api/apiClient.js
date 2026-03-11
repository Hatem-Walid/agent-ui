import axios from "axios";

/**
 * apiClient: مخصص للتعامل مع السيرفر القديم (Auth / Database).
 * baseURL: يتم جلبه من VITE_API_BASE_URL في ملف .env
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    // يمكنك إضافة Headers افتراضية هنا مستقبلاً
  },
});

// ✅ Interceptor: لإضافة توكين التحقق تلقائياً في كل طلب
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // معالجة الخطأ قبل إرسال الطلب
    return Promise.reject(error);
  }
);

// --- دوال الـ API الجاهزة للاستخدام ---

// تسجيل الدخول
export const login = (credentials) => 
  apiClient.post("api/v1/Auth/login", credentials).then(res => res.data);

// إنشاء حساب جديد
export const register = (userData) => 
  apiClient.post("api/v1/Auth/register", userData).then(res => res.data);

export default apiClient;