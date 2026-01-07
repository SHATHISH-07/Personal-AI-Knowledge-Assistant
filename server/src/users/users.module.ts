import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { File, FileSchema } from 'src/files/schemas/file.schema';
import { VectorDbService } from 'src/vector-db/vector-db.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: File.name, schema: FileSchema }
        ], 'USER_DB'),
    ],

    controllers: [UsersController],
    providers: [UsersService, VectorDbService],
    exports: [
        MongooseModule
    ],
})
export class UsersModule { }
