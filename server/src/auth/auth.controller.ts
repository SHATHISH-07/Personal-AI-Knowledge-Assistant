import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
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
        'FRONTEND_URL',
      )
        }/login?emailVerified=true`;


      return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Email Verified | OpenLuma</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #121212; /* Theme Background */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #e4e4e7;
    }
    .card {
      background-color: #181818; /* Theme Surface */
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 16px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .icon-circle {
      width: 64px;
      height: 64px;
      background-color: rgba(34, 197, 94, 0.1); /* Green tint */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px auto;
    }
    .icon {
      font-size: 32px;
    }
    h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 12px 0;
    }
    p {
      color: #a1a1aa; /* Zinc-400 */
      font-size: 15px;
      line-height: 1.5;
      margin: 0 0 32px 0;
    }
    .btn {
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
      padding: 14px 24px;
      background-color: #ffffff; /* Primary Button White */
      color: #000000; /* Primary Button Text Black */
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      transition: background-color 0.2s;
    }
    .btn:hover {
      background-color: #e4e4e7;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-circle">
      <span class="icon">✅</span>
    </div>
    <h1>Email Verified</h1>
    <p>Your email has been successfully verified.<br/>You can now log in to your account.</p>
    <a href="${loginUrl}"class="btn">Return to Login</a>
  </div>
</body>
</html>`);
    } catch (err) {
      return res.status(400).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Verification Failed | OpenLuma</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #121212;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #e4e4e7;
    }
    .card {
      background-color: #181818;
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 16px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .icon-circle {
      width: 64px;
      height: 64px;
      background-color: rgba(239, 68, 68, 0.1); /* Red tint */
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px auto;
    }
    .icon {
      font-size: 32px;
    }
    h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 12px 0;
    }
    p {
      color: #a1a1aa;
      font-size: 15px;
      line-height: 1.5;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon-circle">
      <span class="icon">❌</span>
    </div>
    <h1>Verification Failed</h1>
    <p>This verification link is invalid or has expired.<br/>Please try signing up again or contact support.</p>
  </div>
</body>
</html>`);
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
    )
      }/overview`;

    const { accessToken, refreshToken } =
      await this.authService.handleGoogleUser(req.user);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none" as const,
      path: "/",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.redirect(redirectUrl);
  }

  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none" as const,
      path: "/",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return { message: "Login successful" };
  }

  @Post('refresh')
  async refresh(
    @Req() req,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies.refreshToken as string;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshTokens(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return { success: true };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  logout(
    @Req() req,
    @Res({ passthrough: true }) res: Response
  ) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return this.authService.logout(req.user.userId);
  }
}
