import { Injectable, OnModuleInit } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';
import { ConfigService } from '@nestjs/config';
import { VectorPayload } from './vector.types';

@Injectable()
export class VectorDbService implements OnModuleInit {
    private client: QdrantClient;
    private collection: string;

    constructor(private readonly config: ConfigService) {
        this.collection = this.config.get<string>('QDRANT_COLLECTION')!;
    }

    async onModuleInit() {
        this.client = new QdrantClient({
            url: this.config.get<string>('QDRANT_URL')!,
            apiKey: this.config.get<string>('QDRANT_API_KEY')!,
        });

        await this.ensureCollection();
    }

    private async ensureCollection() {
        const { collections } = await this.client.getCollections();

        const exists = collections.some(
            (c) => c.name === this.collection,
        );

        if (!exists) {
            await this.client.createCollection(this.collection, {
                vectors: {
                    size: 384,
                    distance: 'Cosine',
                },
            });
        }
    }

    async upsert(
        id: string,
        vector: number[],
        payload: VectorPayload,
    ) {

        if (vector.length !== 384) {
            throw new Error(`Invalid embedding size: ${vector.length}`);
        }

        await this.client.upsert(this.collection, {
            wait: true,
            points: [
                {
                    id,
                    vector,
                    payload,
                },
            ],
        });
    }

    async search(
        vector: number[],
        userId: string,
        limit = 5,
    ) {
        return this.client.search(this.collection, {
            vector,
            limit,
            filter: {
                must: [
                    {
                        key: 'userId',
                        match: { value: userId },
                    },
                ],
            },
        });
    }
}
