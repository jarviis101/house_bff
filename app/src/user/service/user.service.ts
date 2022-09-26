import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/schemas/user.schema';
import { Model } from 'mongoose';
import { UserServiceInterface } from '@/user/service/user.service.interface';
import { GoogleUserModel } from '@/google/model/google-user.model';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createByBaseAuth(dto: CreateUserDTO): Promise<User> {
        return new this.userModel(dto).save();
    }

    async createByGoogleAuth(model: GoogleUserModel): Promise<User> {
        return new this.userModel(model).save();
    }
}
