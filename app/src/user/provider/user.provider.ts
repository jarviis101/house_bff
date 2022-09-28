import { Injectable } from '@nestjs/common';
import { User } from '@/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProviderInterface } from '@/user/provider/user.provider.interface';

@Injectable()
export class UserProvider implements UserProviderInterface {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async provideByEmail(email: string): Promise<User> {
        return this.userModel
            .findOne({
                email: email,
            })
            .exec();
    }
}
