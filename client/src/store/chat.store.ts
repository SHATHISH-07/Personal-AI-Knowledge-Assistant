import { create } from "zustand";
import type { ChatMessage } from "@/types/chat.type";
import { askAI } from "@/api/ask.api";

interface ChatState {
    messages: ChatMessage[];
    loading: boolean;

    ask: (question: string) => Promise<void>;
    clear: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    loading: false,

    ask: async (question) => {
        set({ loading: true });

        const res = await askAI(question);

        set((state) => ({
            messages: [
                ...state.messages,
                {
                    question,
                    answer: res.data.answer,
                    sources: res.data.sources,
                },
            ],
            loading: false,
        }));
    },

    clear: () => set({ messages: [] }),
}));
