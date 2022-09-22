import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '@/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserProvider {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    async provideByEmail(email: string): Promise<User> {
        return this.userModel
            .findOne({
                email: email,
            })
            .exec();
    }
}
