import { User } from '@/schemas/user.schema';
import { GoogleUserModel } from '@/google/model/google-user.model';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';

export interface UserServiceInterface {
    createByBaseAuth(dto: CreateUserDTO): Promise<User>;
    createByGoogleAuth(model: GoogleUserModel): Promise<User>;
}
