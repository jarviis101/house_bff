import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/schemas/user.schema';
import { Model } from 'mongoose';
import { UserInterface } from '@/google/dto/user.dto.interface';
import { UserServiceInterface } from '@/user/service/user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(dto: UserInterface): Promise<User> {
        const createdUser = new this.userModel(dto);
        return createdUser.save();
    }
}
