import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { EmailVerification, EmailVerificationDocument } from 'src/email-verification/schemas/emailVerification.schema';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {

    private googleClient: OAuth2Client;

    constructor(
        @InjectModel(User.name) private userModule: Model<UserDocument>,
        @InjectModel(EmailVerification.name) private emailVerificationModel: Model<EmailVerificationDocument>,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailService: MailService
    ) {
        this.googleClient = new OAuth2Client(
            this.configService.get<string>('GOOGLE_CLIENT_ID'),
        );
    }

    private async generateTokens(userId: string, email: string) {
        const accessToken = this.jwtService.sign(
            { sub: userId, email },
            { expiresIn: '15m' },
        )

        const refreshToken = this.jwtService.sign(
            { sub: userId },
            { expiresIn: '7d' },
        )

        return { accessToken, refreshToken }
    }

    private async saveRefreshToken(userId: string, refreshToken: string) {
        const hash = await bcrypt.hash(refreshToken, 10);

        await this.userModule.updateOne(
            { _id: userId },
            { refreshTokenHash: hash }
        );
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken);

            const user = await this.userModule.findById(payload.sub);
            if (!user || !user.refreshTokenHash) {
                throw new UnauthorizedException();
            }

            const isValid = await bcrypt.compare(
                refreshToken,
                user.refreshTokenHash
            );

            if (!isValid) {
                throw new UnauthorizedException();
            }

            const { accessToken, refreshToken: newRefreshToken } =
                await this.generateTokens(user._id.toString(), user.email);

            await this.saveRefreshToken(user._id.toString(), newRefreshToken);

            return {
                accessToken,
                refreshToken: newRefreshToken,
            };
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async register(registerDto: RegisterDto) {
        const { name, email, password } = registerDto;

        const existingUser = await this.userModule.findOne({ email });
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new this.userModule({
            name,
            email,
            passwordHash,
            authProvider: 'local',
        });

        await newUser.save();

        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = await bcrypt.hash(rawToken, 10);

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        await this.mailService.sendVerificationEmail(
            newUser.email,
            rawToken,
        );

        await this.emailVerificationModel.create({
            userId: newUser._id,
            tokenHash,
            expiresAt,
        });

        const { accessToken, refreshToken } =
            await this.generateTokens(newUser._id.toString(), newUser.email);

        await this.saveRefreshToken(newUser._id.toString(), refreshToken);

        return { accessToken, refreshToken };

    }

    async verifyEmail(token: string) {
        const records = await this.emailVerificationModel.find({
            expiresAt: { $gt: new Date() },
        });

        for (const record of records) {
            const isMatch = await bcrypt.compare(token, record.tokenHash);

            if (!isMatch) continue;

            const user = await this.userModule.findById(record.userId);
            if (!user) {
                throw new BadRequestException('User not found');
            }

            await this.userModule.updateOne(
                { _id: user._id },
                { isEmailVerified: true },
            );

            await this.emailVerificationModel.deleteOne({ _id: record._id });

            await this.mailService.sendWelcomeEmail(
                user.email,
                user.name,
            );

            return { message: 'Email verified successfully' };
        }

        throw new BadRequestException('Invalid or expired verification token');
    }

    async resendVerification(email: string) {
        const user = await this.userModule.findOne({ email });
        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (user.isEmailVerified) {
            throw new BadRequestException('Email already verified');
        }

        await this.emailVerificationModel.deleteMany({
            userId: user._id,
        });

        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = await bcrypt.hash(rawToken, 10);

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        await this.emailVerificationModel.create({
            userId: user._id,
            tokenHash,
            expiresAt,
        });

        await this.mailService.sendVerificationEmail(
            user.email,
            rawToken,
        );

        return {
            message: 'Verification email resent successfully',
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userModule.findOne({ email });
        if (!user || !user.passwordHash) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.isEmailVerified) {
            throw new UnauthorizedException('Please verify your email');
        }

        const { accessToken, refreshToken } =
            await this.generateTokens(user._id.toString(), user.email);

        await this.saveRefreshToken(user._id.toString(), refreshToken);

        return { accessToken, refreshToken };
    }

    async googleLogin(idToken: string) {
        const ticket = await this.googleClient.verifyIdToken({
            idToken,
            audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
        });

        const payload = ticket.getPayload();
        if (!payload) {
            throw new BadRequestException('Invalid Google token');
        }

        const { email, sub: googleId, picture, name } = payload;

        let user = await this.userModule.findOne({ email });

        if (user && user.googleId !== googleId) {
            throw new BadRequestException('Google account already in use');
        }

        if (!user) {
            user = await this.userModule.create({
                email,
                googleId,
                profilePictureUrl: picture,
                name,
                authProvider: 'google',
                isEmailVerified: true,
            });
        }

        const { accessToken, refreshToken } =
            await this.generateTokens(user._id.toString(), user.email);

        await this.saveRefreshToken(user._id.toString(), refreshToken);

        return { accessToken, refreshToken };
    }

    async logout(userId: string) {
        await this.userModule.updateOne(
            { _id: userId },
            { refreshTokenHash: null }
        );

        return { message: 'Logged out successfully' };
    }

}
