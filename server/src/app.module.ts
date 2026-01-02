import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { MailModule } from './mail/mail.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { FilesModule } from './files/files.module';
import { ContentSourceModule } from './content-source/content-source.module';
import { ChunkingModule } from './chunking/chunking.module';
import { EmbeddingModule } from './embedding/embedding.module';
import { VectorDbModule } from './vector-db/vector-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      connectionName: 'USER_DB',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('USER_DB_URI'),
      }),
    }),

    MongooseModule.forRootAsync({
      connectionName: 'CONTENT_DB',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('CONTENT_DB_URI'),
      }),
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: 300,
          limit: 10,
        }
      ]
    }),

    UsersModule,
    AuthModule,
    EmailVerificationModule,
    MailModule,
    PasswordResetModule,
    FilesModule,
    ContentSourceModule,
    ChunkingModule,
    EmbeddingModule,
    VectorDbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
