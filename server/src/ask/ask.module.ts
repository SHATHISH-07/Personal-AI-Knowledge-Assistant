import { Module } from '@nestjs/common';
import { LlmModule } from 'src/llm/llm.module';
import { AskService } from './ask.service';
import { AskController } from './ask.controller';
import { VectorDbModule } from 'src/vector-db/vector-db.module';
import { EmbeddingModule } from 'src/embedding/embedding.module';

@Module({
    imports: [LlmModule,
        VectorDbModule,
        EmbeddingModule,
    ],
    providers: [AskService],
    controllers: [AskController],
    exports: [AskService],
})
export class AskModule { }
