import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ContentSource, ContentSourceDocument } from 'src/content-source/schemas/content-source.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FileDocument } from './schemas/file.schema';
import { ChunkingService } from 'src/chunking/chunking.service';
import { VectorDbService } from 'src/vector-db/vector-db.service';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { randomUUID } from 'crypto';
import { TextExtractorService } from './text-extractor.service';

@Injectable()
export class FilesService {
    constructor(
        @InjectModel(File.name, 'USER_DB') private fileModel: Model<FileDocument>,
        @InjectModel(ContentSource.name, 'CONTENT_DB')
        private contentModel: Model<ContentSourceDocument>,
        private chunkingService: ChunkingService,
        private embeddingService: EmbeddingService,
        private vectorDbService: VectorDbService,
    ) { }

    async handleUpload(file: Express.Multer.File, userId: string) {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        const extension = file.originalname.split('.').pop()?.toLowerCase();

        if (!extension) {
            throw new BadRequestException('File extension is required');
        }

        const CODE_EXTENSIONS = new Set([
            'js', 'jsx', 'ts', 'tsx', 'mjs', 'cjs', 'html', 'htm', 'css', 'scss', 'sass', 'less',
            'py', 'java', 'c', 'cpp', 'h', 'hpp', 'cs', 'go', 'rs', 'rb', 'php', 'pl', 'swift', 'kt', 'kts',
            'json', 'yaml', 'yml', 'xml', 'toml', 'env', 'ini', 'conf', 'sql', 'prisma', 'sh', 'bash', 'zsh', 'bat', 'ps1', 'dockerfile'
        ]);

        const isCode = CODE_EXTENSIONS.has(extension);

        const fileType: 'code' | 'text' = isCode ? 'code' : 'text';

        const savedFile = await this.fileModel.create({
            userId,
            fileName: file.originalname,
            fileType,
            language: isCode ? extension : undefined,
            size: file.size,
        });

        try {
            const extractedText = await TextExtractorService.extract(file);

            if (!extractedText.trim()) {
                throw new BadRequestException('File is empty');
            }

            const chunks = this.chunkingService.chunk(extractedText, fileType);

            for (const chunk of chunks) {
                if (!chunk.text.trim()) continue;

                const embedding = await this.embeddingService.embed(chunk.text);

                await this.vectorDbService.upsert(
                    randomUUID(),
                    embedding,
                    {
                        userId,
                        fileId: savedFile._id.toString(),
                        fileName: savedFile.fileName,
                        text: chunk.text,
                        chunkIndex: chunk.metadata.chunkIndex,
                        chunkType: chunk.metadata.chunkType,
                        feature: chunk.metadata.feature,
                        embeddingModel: 'all-MiniLM-L6-v2',
                    },
                );
            }

            await this.contentModel.create({
                userId,
                fileId: savedFile._id.toString(),
                extractedText,
            });

            return {
                message: 'File uploaded successfully',
                fileId: savedFile._id,
            };

        } catch (error) {

            console.error(`Upload processing failed for ${savedFile._id}:`, error);

            await this.fileModel.deleteOne({ _id: savedFile._id });

            throw new BadRequestException(`Failed to process file: ${error.message}`);
        }


    }

    async getUserFiles(userId: string) {
        return this.fileModel.find({ userId });
    }

    async getFile(userId: string, fileId: string) {
        const file = await this.fileModel.findOne({ _id: fileId, userId });
        if (!file) throw new NotFoundException('File not found');
        return file;
    }

    async getFileByName(userId: string, fileName: string) {
        const file = await this.fileModel.findOne({ userId, fileName });
        if (!file) throw new NotFoundException('File not found');
        return file;
    }

    async archiveFile(userId: string, fileId: string) {
        return this.fileModel.updateOne(
            { _id: fileId, userId },
            { isArchived: true },
        );
    }

    async unarchiveFile(userId: string, fileId: string) {
        return this.fileModel.updateOne(
            { _id: fileId, userId },
            { isArchived: false },
        );
    }

    async getArchivedFileIds(userId: string): Promise<string[]> {
        const files = await this.fileModel.find(
            { userId, isArchived: true },
            { _id: 1 }
        );

        return files.map(file => file._id.toString());
    }

    async deleteFile(userId: string, fileId: string) {
        await this.fileModel.deleteOne({ _id: fileId, userId });
    }
}

