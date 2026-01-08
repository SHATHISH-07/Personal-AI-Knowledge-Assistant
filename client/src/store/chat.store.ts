import { create } from "zustand";
import { askAI } from "@/api/ask.api";

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}


const getKeys = (userId: string) => ({
    HISTORY_KEY: `openluma_recent_questions_${userId}`,
    MESSAGES_KEY: `openluma_chat_messages_${userId}`,
});

interface AskState {
    messages: ChatMessage[];
    loading: boolean;
    recentQuestions: string[];
    inputPrompt: string;
    setInputPrompt: (val: string) => void;


    ask: (userId: string, question: string) => Promise<void>;
    loadRecent: (userId: string) => void;
    clearChat: (userId: string) => void;
}

export const useAskStore = create<AskState>((set, get) => ({
    messages: [],
    loading: false,
    recentQuestions: [],
    inputPrompt: "",

    setInputPrompt: (val) => set({ inputPrompt: val }),

    loadRecent: (userId) => {
        if (!userId) return;
        const { HISTORY_KEY, MESSAGES_KEY } = getKeys(userId);

        const storedHistory = localStorage.getItem(HISTORY_KEY);
        const recentQuestions = storedHistory ? JSON.parse(storedHistory) : [];

        const storedMessages = localStorage.getItem(MESSAGES_KEY);
        const messages = storedMessages ? JSON.parse(storedMessages) : [];

        set({ recentQuestions, messages });
    },

    ask: async (userId, question) => {
        if (!userId) return;
        const { HISTORY_KEY, MESSAGES_KEY } = getKeys(userId);

        set({ loading: true });


        const userMsg: ChatMessage = { role: "user", content: question };

        set((state) => ({
            messages: [...state.messages, userMsg],
        }));


        const currentRecent = get().recentQuestions;
        const prev = currentRecent.filter((q) => q !== question);
        const updatedQuestions = [question, ...prev].slice(0, 10);

        localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedQuestions));
        set({ recentQuestions: updatedQuestions });

        try {

            const res = await askAI(question);
            const botMsg: ChatMessage = { role: "assistant", content: res.data.answer };


            set((state) => {
                const newMessages = [...state.messages, botMsg];


                const messagesToSave = newMessages.slice(-20);
                localStorage.setItem(MESSAGES_KEY, JSON.stringify(messagesToSave));

                return {
                    messages: newMessages,
                    loading: false,
                };
            });
        } catch (error) {
            console.error(error);
            set({ loading: false });
        }
    },

    clearChat: (userId) => {
        if (!userId) return;
        const { MESSAGES_KEY } = getKeys(userId);

        localStorage.removeItem(MESSAGES_KEY);
        set({ messages: [] });
    },
}));