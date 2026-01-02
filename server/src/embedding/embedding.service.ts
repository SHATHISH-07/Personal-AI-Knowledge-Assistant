import { Injectable, OnModuleInit } from '@nestjs/common';
import { pipeline } from '@xenova/transformers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmbeddingService implements OnModuleInit {
    private embedder: any;

    constructor(private config: ConfigService) { }

    async onModuleInit() {
        process.env.HF_TOKEN = this.config.get<string>('HF_TOKEN');

        const model = this.config.get<string>('EMBEDDING_MODEL');

        console.log('🔹 Loading embedding model:', model);

        this.embedder = await pipeline(
            'feature-extraction',
            model,
        );
    }

    async embed(text: string): Promise<number[]> {
        const output = await this.embedder(text, {
            pooling: 'mean',
            normalize: true,
        });

        return Array.from(output.data);
    }
}
