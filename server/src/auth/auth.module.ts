import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { EmailVerificationModule } from 'src/email-verification/email-verification.module';
import { MailModule } from 'src/mail/mail.module';
import { PasswordResetModule } from 'src/password-reset/password-reset.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [

    UsersModule,
    ConfigModule,
    EmailVerificationModule,
    MailModule,
    PasswordResetModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy]
})
export class AuthModule { }
