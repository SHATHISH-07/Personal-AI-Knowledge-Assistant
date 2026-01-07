import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UploadFileDto } from './dto/uploadFile.dto';
import { ContentSource, ContentSourceDocument } from 'src/content-source/schemas/content-source.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FileDocument } from './schemas/file.schema';
import { ChunkingService } from 'src/chunking/chunking.service';
import { VectorDbService } from 'src/vector-db/vector-db.service';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { randomUUID } from 'crypto';

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

        const extension = file.originalname.split('.').pop();
        const isCode = ['js', 'ts', 'py', 'java', 'c', 'cpp', 'go', 'html', 'css', 'php', 'json'].includes(extension ?? '');
        const fileType = isCode ? 'code' : 'text';

        const savedFile = await this.fileModel.create({
            userId,
            fileName: file.originalname,
            fileType,
            language: isCode ? extension : undefined,
            size: file.size,
        });

        const extractedText = file.buffer.toString('utf-8');

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
}

