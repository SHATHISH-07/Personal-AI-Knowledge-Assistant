import { Injectable } from "@nestjs/common";
import { EmbeddingService } from "src/embedding/embedding.service";
import { GroqService } from "src/llm/llm.service";
import { VectorDbService } from "src/vector-db/vector-db.service";
import { buildPrompt } from "./utils/rag.prompt";

@Injectable()
export class AskService {
    constructor(
        private embeddingService: EmbeddingService,
        private vectorDbService: VectorDbService,
        private groqService: GroqService,
    ) { }

    async ask(question: string, userId: string) {
        if (!question?.trim()) {
            return { answer: 'Invalid question', sources: [] };
        }

        const enhancedQuestion = `
                    User question:
                    ${question}

                    This question is about a document uploaded by the user.
                    Please provide a concise and relevant answer based on the content of the document.
                    If the document does not contain information related to the question, respond with "I couldn't find a relevant match, but try rephrasing the question."
                `;


        const queryVector = await this.embeddingService.embed(enhancedQuestion);

        const chunks = await this.vectorDbService.search(
            queryVector,
            userId,
            5,
        );

        if (!chunks.length) {
            return {
                answer:
                    "I couldn’t find a highly relevant match, but try rephrasing the question.",
                sources: [],
            };
        }


        const context = chunks
            .filter((c) => c.text)
            .slice(0, 4)
            .map((c, i) => `Source ${i + 1}:\n${c.text}`)
            .join('\n\n');

        const prompt = buildPrompt(question, context);

        const answer = await this.groqService.generate(prompt);

        return {
            answer,
            sources: chunks.map((c, i) => ({
                source: i + 1,
                fileName: c.fileName,
                chunkIndex: c.chunkIndex,
                score: c.score,
            })),
        };
    }
}
