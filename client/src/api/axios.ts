import { useAuthStore } from "@/store/auth.store";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
})

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config;

        if (original.url.includes("/auth/login") || original.url.includes("/login")) {
            return Promise.reject(error);
        }

        if (
            error.response?.status === 401 &&
            !original._retry
        ) {
            original._retry = true;

            try {
                await api.post("/auth/refresh");
                return api(original);
            } catch {
                const { logoutUser } = useAuthStore.getState();
                await logoutUser();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


export default api;

