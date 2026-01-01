import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSource, ContentSourceSchema } from './schemas/content-source.schema';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: ContentSource.name, schema: ContentSourceSchema }],
            'CONTENT_DB',
        ),
    ],
    exports: [MongooseModule],
})
export class ContentSourceModule { }
