import { Chunk, ChunkType } from '../chunk.types';

export function chunkText(
    text: string,
    maxLength = 800,
): Chunk[] {
    const paragraphs = text.split(/\n{2,}/);
    const chunks: Chunk[] = [];
    let buffer = '';

    for (const para of paragraphs) {
        const cleaned = para.trim();
        if (!cleaned) continue;

        if ((buffer + cleaned).length > maxLength) {
            if (buffer.trim()) {
                chunks.push({
                    text: buffer.trim(),
                    metadata: {
                        chunkIndex: chunks.length,
                        chunkType: 'text' as ChunkType,
                    },
                });
            }
            buffer = '';
        }

        buffer += cleaned + '\n\n';
    }

    if (buffer.trim()) {
        chunks.push({
            text: buffer.trim(),
            metadata: {
                chunkIndex: chunks.length,
                chunkType: 'text' as ChunkType,
            },
        });
    }

    return chunks;
}
