// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    check() {
        return this.healthService.basic();
    }

    @Get('ready')
    ready() {
        return this.healthService.ready();
    }
}
