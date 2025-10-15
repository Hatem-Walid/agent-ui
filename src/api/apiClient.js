import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ده بياخد القيمة من ملف .env
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ ضيف التوكين تلقائيًا في كل ريكويست
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;