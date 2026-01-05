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

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isInitialized: false,
    isLoading: false,


    initializeAuth: async () => {
        if (get().isInitialized) return;

        set({ isLoading: true });

        try {
            const res = await getMe();
            set({
                user: res.data,
                isAuthenticated: true,
            });
        } catch (err: unknown) {
            if (err && typeof err === "object" && "response" in err) {
                set({
                    user: null,
                    isAuthenticated: false,
                });
            }
        } finally {
            set({
                isInitialized: true,
                isLoading: false,
            });
        }
    },


    loginUser: async (email: string, password: string) => {
        set({ isLoading: true });
        await login({ email, password });

        const res = await getMe();
        set({
            user: res.data,
            isAuthenticated: true,
            isInitialized: true,
            isLoading: false,
        });
    },

    logoutUser: async () => {
        await logout();
        set({
            user: null,
            isAuthenticated: false,
            isInitialized: true,
        });
    },
}));
