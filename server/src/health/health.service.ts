import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { VectorDbService } from 'src/vector-db/vector-db.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
    constructor(
        @InjectConnection('USER_DB') private userDb: Connection,
        @InjectConnection('CONTENT_DB') private contentDb: Connection,
        private vectorDbService: VectorDbService,
        private config: ConfigService,
    ) { }

    basic() {
        return {
            status: 'ok',
            service: 'OpenLuma API',
            timestamp: new Date().toISOString(),
        };
    }

    async ready() {
        const checks = {
            userDb: this.userDb.readyState === 1,
            contentDb: this.contentDb.readyState === 1,
            qdrant: false,
            llmConfigured: false,
        };

        try {
            await this.vectorDbService.health();
            checks.qdrant = true;
        } catch { }

        checks.llmConfigured = Boolean(
            this.config.get('GROQ_API_KEY'),
        );

        return {
            status: Object.values(checks).every(Boolean) ? 'ready' : 'degraded',
            checks,
            timestamp: new Date().toISOString(),
        };
    }
}
