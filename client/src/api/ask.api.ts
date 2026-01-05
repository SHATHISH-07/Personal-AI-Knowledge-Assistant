import type { AskResponse } from "@/types/chat.type";
import api from "./axios";

export const askAI = (question: string) => {
    return api.post<AskResponse>("/ask", { question });
};
