import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // بياخد القيمة من .env
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ ضيف التوكين تلقائيًا في كل request
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

// دوال API
export const login = (credentials) => apiClient.post("api/v1/Auth/login", credentials).then(res => res.data);
export const register = (userData) => apiClient.post("api/v1/Auth/register", userData).then(res => res.data);

export default apiClient;
