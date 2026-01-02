export type ChunkType = 'code' | 'text';

export interface ChunkMetadata {
    chunkIndex: number;
    chunkType: ChunkType;
    feature?: string;
}

export interface Chunk {
    text: string;
    metadata: ChunkMetadata;
}
