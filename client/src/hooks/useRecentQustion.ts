const KEY = import.meta.env.OPENLUMA_RECENT_QUESTIONS_KEY || "openluma_recent_questions";

export const useRecentQuestions = () => {
    const get = (): string[] => {
        try {
            return JSON.parse(localStorage.getItem(KEY) || "[]");
        } catch {
            return [];
        }
    };

    const add = (question: string) => {
        const existing = get();
        const updated = [question, ...existing].slice(0, 5);
        localStorage.setItem(KEY, JSON.stringify(updated));
    };

    const clear = () => {
        localStorage.removeItem(KEY);
    };

    return { get, add, clear };
};
