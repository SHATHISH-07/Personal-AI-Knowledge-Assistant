export interface Source {
    fileId: string;
    fileName: string;
    chunkIndex: number;
    chunkType: "code" | "text";
    score: number;
}

export interface AskResponse {
    answer: string;
    sources: Source[];
}

export interface ChatMessage {
    question: string;
    answer: string;
    sources: Source[];
}
