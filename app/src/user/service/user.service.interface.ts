import { User } from '@/schemas/user.schema';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';
import { GoogleUserDTO } from '@/google/dto/google-user.dto';

export interface UserServiceInterface {
    createByBaseAuth(dto: CreateUserDTO): Promise<User>;
    createByGoogleAuth(dto: GoogleUserDTO): Promise<User>;
}
