import { create } from "zustand";
import { getSummary } from "@/api/auth.api";
import type { DashboardSummary } from "@/types/dashboard.type";

interface DashboardState {
    summary: DashboardSummary | null;
    loading: boolean;
    fetchSummary: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    summary: null,
    loading: false,

    fetchSummary: async () => {
        set({ loading: true });
        const res = await getSummary();
        set({ summary: res.data, loading: false });
    },
}));
