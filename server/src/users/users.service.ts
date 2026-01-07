import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { FileDocument } from 'src/files/schemas/file.schema';
import { VectorDbService } from 'src/vector-db/vector-db.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(File.name, 'USER_DB') private fileModel: Model<FileDocument>,
        private vectorDbService: VectorDbService,
        @InjectModel(User.name, 'USER_DB') private userModel: Model<UserDocument>,
    ) { }

    async getUserById(userId: string): Promise<User | null> {
        return this.userModel.findById(userId).select('-passwordHash');
    }

    async getSummary(userId: string) {
        const totalFiles = await this.fileModel.countDocuments({
            userId,
            isArchived: { $ne: true },
        });

        const archivedFiles = await this.fileModel.countDocuments({
            userId,
            isArchived: true,
        });

        const recentFiles = await this.fileModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("fileName fileType createdAt");

        let totalChunks = 0;
        try {
            totalChunks = await this.vectorDbService.countByUser(userId);
        } catch {
            totalChunks = 0;
        }

        return {
            totalFiles,
            archivedFiles,
            totalChunks,
            recentFiles,
        };
    }
}
