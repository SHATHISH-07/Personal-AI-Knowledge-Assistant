import { useAuthStore } from "@/store/auth.store";

export const useAuth = () => {
    const {
        user,
        isAuthenticated,
        isInitialized,
        isLoading,
        initializeAuth,
        loginUser,
        logoutUser,

    } = useAuthStore();

    return {
        user,
        isAuthenticated,
        isInitialized,
        isLoading,
        initializeAuth,
        loginUser,
        logoutUser,
    };
};
