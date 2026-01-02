import { Module } from '@nestjs/common';
import { ChunkingService } from './chunking.service';

@Module({
  providers: [ChunkingService],
  exports: [ChunkingService],
})
export class ChunkingModule { }
