import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './schemas/file.schema';
import { ContentSourceModule } from 'src/content-source/content-source.module';
import { ChunkingService } from 'src/chunking/chunking.service';
import { ChunkingModule } from 'src/chunking/chunking.module';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { VectorDbModule } from 'src/vector-db/vector-db.module';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema },
    ],
      "USER_DB"),
    ContentSourceModule,
    ChunkingModule,
    EmbeddingModule,
    VectorDbModule
  ],
  exports: [FilesService],
})
export class FilesModule { }
