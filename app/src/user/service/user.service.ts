import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@/schemas/user.schema';
import { Model } from 'mongoose';
import { UserServiceInterface } from '@/user/service/user.service.interface';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';
import { GoogleUser } from '@/google/dto/google-user.dto';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createByBaseAuth(dto: CreateUserDTO): Promise<User> {
        return new this.userModel(dto).save();
    }

    async createByGoogleAuth(dto: GoogleUser): Promise<User> {
        return new this.userModel(dto).save();
    }
}
