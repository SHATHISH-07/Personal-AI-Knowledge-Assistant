import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './schemas/file.schema';
import { ContentSourceModule } from 'src/content-source/content-source.module';

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema },
    ],
      "USER_DB"),
    ContentSourceModule
  ]
})
export class FilesModule { }
