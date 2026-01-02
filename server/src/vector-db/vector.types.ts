export type ChunkType = 'text' | 'code';

export interface VectorPayload extends Record<string, unknown> {
    userId: string;
    fileId: string;
    fileName: string;
    text: string;
    chunkIndex: number;
    chunkType: ChunkType;
    feature?: string;
    embeddingModel: string;
}
