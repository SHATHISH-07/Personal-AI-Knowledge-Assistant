import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AskService } from './ask.service';
import { Throttle } from '@nestjs/throttler';

@Controller('ask')
export class AskController {

    constructor(private readonly askService: AskService) { }

    @Throttle({
        default: {
            ttl: 60,
            limit: 20,
        }
    })
    @Post()
    @UseGuards(JwtAuthGuard)
    ask(@Body('question') question: string, @Req() req) {
        return this.askService.ask(question, req.user.userId);
    }
}
