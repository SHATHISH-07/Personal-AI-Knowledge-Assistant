import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordReset, PasswordResetSchema } from './schemas/passwordReset.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PasswordReset.name, schema: PasswordResetSchema }
        ], 'USER_DB'),
    ],
    exports: [MongooseModule],
})
export class PasswordResetModule { }
