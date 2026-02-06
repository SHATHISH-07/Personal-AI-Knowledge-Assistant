import { create } from "zustand";
import { getMe, login, logout } from "@/api/auth.api";
import type { User } from "@/types/auth.type";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    isLoading: boolean;

    initializeAuth: () => Promise<void>;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isInitialized: false,
    isLoading: false,

    initializeAuth: async () => {
        set({ isLoading: true });

        const token = localStorage.getItem("accessToken");

        if (!token) {
            set({
                user: null,
                isAuthenticated: false,
                isInitialized: true,
                isLoading: false,
            });
            return;
        }

        try {
            const res = await getMe();

            set({
                user: res.data,
                isAuthenticated: true,
            });
        } catch {
            set({
                user: null,
                isAuthenticated: false,
            });
        } finally {
            set({
                isInitialized: true,
                isLoading: false,
            });
        }
    },

    loginUser: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
            await login({ email, password });

            const res = await getMe();

            set({
                user: res.data,
                isAuthenticated: true,
            });
        } finally {
            set({
                isInitialized: true,
                isLoading: false,
            });
        }
    },

    logoutUser: async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        }

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
            isLoading: false,
        });
    },
}));
