import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailVerification, EmailVerificationSchema } from './schemas/emailVerification.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: EmailVerification.name, schema: EmailVerificationSchema },
        ], 'USER_DB'),
    ],
    exports: [MongooseModule],
})
export class EmailVerificationModule { }
