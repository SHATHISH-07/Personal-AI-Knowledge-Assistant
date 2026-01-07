import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService
    ) { }

    @Get('me')
    async getMe(@Req() req) {
        return this.usersService.getUserById(req.user.userId);
    }

    @Get("dashboard/summary")
    getSummary(@Req() req) {
        return this.usersService.getSummary(req.user.userId);
    }

}
