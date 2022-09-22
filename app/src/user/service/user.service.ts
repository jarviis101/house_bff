import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/schemas/user.schema';
import { Model } from 'mongoose';
import { UserInterface } from '@/google/dto/user.dto.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(dto: UserInterface): Promise<User> {
        const createdUser = new this.userModel(dto);
        return createdUser.save();
    }
}
