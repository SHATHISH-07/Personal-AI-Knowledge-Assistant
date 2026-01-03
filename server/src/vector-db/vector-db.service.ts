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
        const collections = await this.client.getCollections();

        const exists = collections.collections.some(
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

        await this.client.createPayloadIndex(this.collection, {
            field_name: 'userId',
            field_schema: 'keyword',
        });
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
        scoreThreshold = 0.15,
    ) {
        const results = await this.client.search(this.collection, {
            vector,
            limit,
            with_payload: true,
            with_vector: false,
            filter: {
                must: [
                    {
                        key: 'userId',
                        match: { value: userId },
                    },
                ],
            },
        });

        return results
            .filter(r => r.score >= scoreThreshold)
            .map(r => ({
                score: r.score,
                text: r.payload?.text,
                fileId: r.payload?.fileId,
                fileName: r.payload?.fileName,
                chunkIndex: r.payload?.chunkIndex,
                chunkType: r.payload?.chunkType,
                feature: r.payload?.feature,
            }));
    }

    async health() {
        await this.client.getCollections();
    }
}
