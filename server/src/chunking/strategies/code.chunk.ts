import { Chunk, ChunkType } from '../chunk.types';

export function chunkCode(source: string): Chunk[] {
    const regex =
        /(export\s+(async\s+)?(function|class)\s+\w+[\s\S]*?)(?=export\s+(async\s+)?(function|class)|$)/g;

    const matches = source.match(regex) ?? [];

    return matches
        .map(block => block.trim())
        .filter(block => block.length > 0)
        .map((block, index) => {
            const nameMatch = block.match(/(function|class)\s+(\w+)/);

            return {
                text: block,
                metadata: {
                    chunkIndex: index,
                    chunkType: 'code' as ChunkType,
                    feature: nameMatch?.[2],
                },
            };
        });
}

