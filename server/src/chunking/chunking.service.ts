import { Injectable } from '@nestjs/common';
import { Chunk } from './chunk.types';
import { chunkCode } from './strategies/code.chunk';
import { chunkText } from './strategies/text.chunk';

@Injectable()
export class ChunkingService {
    chunk(
        content: string,
        fileType: 'code' | 'text',
    ): Chunk[] {
        if (fileType === 'code') {
            return chunkCode(content);
        }
        return chunkText(content);
    }
}
