import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config;

        if (!original || original._retry) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            original._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    { refreshToken }
                );

                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);

                return api(original);
            } catch {
                localStorage.clear();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
