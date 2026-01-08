import { Injectable } from "@nestjs/common";
import { EmbeddingService } from "src/embedding/embedding.service";
import { FilesService } from "src/files/files.service";
import { GroqService } from "src/llm/llm.service";
import { VectorDbService } from "src/vector-db/vector-db.service";

@Injectable()
export class AskService {
    constructor(
        private embeddingService: EmbeddingService,
        private vectorDbService: VectorDbService,
        private groqService: GroqService,
        private filesService: FilesService,
    ) { }

    async ask(question: string, userId: string) {
        if (!question?.trim()) {
            return { answer: "Invalid question", sources: [] };
        }

        const archivedFileIds = await this.filesService.getArchivedFileIds(userId);

        const queryVector = await this.embeddingService.embed(question);

        const chunks = await this.vectorDbService.search(
            queryVector,
            userId,
            5,
            0.15,
            archivedFileIds
        );

        if (!chunks.length) {
            return {
                answer: "I don't know.",
                sources: [],
            };
        }

        const context = chunks
            .slice(0, 4)
            .map(
                (c, i) =>
                    `[${i + 1}] ${c.fileName}\n${c.text}`
            )
            .join("\n\n");

        const answer = await this.groqService.generate(question, context);

        return {
            answer,
            sources: chunks.map((c, i) => ({
                id: i + 1,
                fileName: c.fileName,
                chunkIndex: c.chunkIndex,
                score: c.score,
            })),
        };
    }

}
