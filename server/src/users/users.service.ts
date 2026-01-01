import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name, 'USER_DB') private userModel: Model<UserDocument>,
    ) { }

    async getUserById(userId: string): Promise<User | null> {
        return this.userModel.findById(userId).select('-passwordHash');
    }
}
