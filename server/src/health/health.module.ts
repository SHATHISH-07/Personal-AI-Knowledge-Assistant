import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { VectorDbModule } from 'src/vector-db/vector-db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    VectorDbModule,
    ConfigModule
  ],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule { }
