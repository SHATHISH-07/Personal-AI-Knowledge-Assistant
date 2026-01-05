import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { ResendVerificationDto } from './dto/resendVerification.dto';
import { Throttle } from '@nestjs/throttler';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import type { Response } from "express";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,
        private configService: ConfigService
    ) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Get("verify-email")
    async verifyEmail(
        @Query("token") token: string,
        @Res() res: Response,
    ) {
        try {
            await this.authService.verifyEmail(token);

            const loginUrl = `${this.configService.get(
                "FRONTEND_URL",
            )}/login?verified=true`;

            return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Email Verified | OpenLuma</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #020617;
      color: #e5e7eb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont;
    }
    .card {
      background: #020617;
      border: 1px solid #1e293b;
      padding: 32px;
      border-radius: 12px;
      max-width: 420px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    h1 {
      color: #22c55e;
      margin-bottom: 12px;
    }
    p {
      color: #94a3b8;
      font-size: 14px;
      margin-bottom: 24px;
    }
    a {
      display: inline-block;
      padding: 10px 20px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-size: 14px;
    }
    a:hover {
      background: #1d4ed8;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>✅ Email Verified</h1>
    <p>Your email has been successfully verified.<br/>
    You can now log in to your OpenLuma account.</p>
    <a href="${loginUrl}">Return to Login</a>
  </div>
</body>
</html>
      `);
        } catch (err) {
            return res.status(400).send(`
<!DOCTYPE html>
<html>
<head>
  <title>Verification Failed | OpenLuma</title>
</head>
<body style="background:#020617;color:#e5e7eb;font-family:sans-serif;text-align:center;padding:40px">
  <h1>❌ Verification Failed</h1>
  <p>This verification link is invalid or expired.</p>
</body>
</html>
      `);
        }
    }

    @Throttle({
        default: {
            ttl: 300,
            limit: 5
        }
    })
    @Post('resend-verification')
    resendVerification(@Body() dto: ResendVerificationDto) {
        return this.authService.resendVerification(dto.email);
    }

    @Get("google")
    @UseGuards(AuthGuard("google"))
    async googleAuth() {
    }

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    async googleCallback(@Req() req, @Res() res) {

        const redirectUrl = `${this.configService.get(
            'FRONTEND_URL',
        )}/dashboard`;

        const { accessToken, refreshToken } =
            await this.authService.handleGoogleUser(req.user);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });

        return res.redirect(redirectUrl);
    }

    @Post("login")
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { accessToken, refreshToken } =
            await this.authService.login(loginDto);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });

        return { message: "Login successful" };
    }


    @Post('refresh')
    async refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshTokens(dto.refreshToken);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() dto: ForgotPasswordDto) {
        return this.authService.forgotPassword(dto.email);
    }

    @Post('reset-password')
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Req() req) {
        return this.authService.logout(req.user.userId);
    }

}
