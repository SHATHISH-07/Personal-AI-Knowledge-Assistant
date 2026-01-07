import type { User } from "@/types/auth.type";
import api from "./axios";
import type { DashboardSummary } from "@/types/dashboard.type";

export const register = (data: {
    name: string;
    email: string;
    password: string;
}) => {
    return api.post("/auth/register", data);
};

export const login = (data: {
    email: string;
    password: string;
}) => {
    return api.post("/auth/login", data);
};

export const getMe = () => {
    return api.get<User>("/users/me");
};

export const getSummary = () => {
    return api.get<DashboardSummary>("/users/dashboard/summary");
};


export const logout = () => {
    return api.post("/auth/logout");
};

export const resendVerification = ({ email }: { email: string }) => {
    return api.post("/auth/resend-verification", { email });
};

export const verifyEmail = (token: string) => {
    return api.get(`/auth/verify-email?token=${token}`);
};

export const requestPasswordReset = (email: string) => {
    return api.post("/auth/forgot-password", { email });
};

export const resetPassword = (data: {
    token: string;
    newPassword: string;
}) => {
    return api.post("/auth/reset-password", {
        token: data.token,
        password: data.newPassword
    });
};
