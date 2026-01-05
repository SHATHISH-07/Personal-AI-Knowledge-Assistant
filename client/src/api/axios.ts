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
    (response) => response,
    (error) => {
        if (!error.response) {
            console.error("Network error or server unreachable");
            return Promise.reject(error);
        }

        const status = error.response.status;

        if (status === 401) {
            console.warn("Unauthorized – redirect to login if needed");
        }

        return Promise.reject(error);
    }
);

export default api;

