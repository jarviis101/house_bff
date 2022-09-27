import { User } from '@/schemas/user.schema';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';
import { GoogleUser } from '@/google/dto/google-user.dto';

export interface UserServiceInterface {
    createByBaseAuth(dto: CreateUserDTO): Promise<User>;
    createByGoogleAuth(model: GoogleUser): Promise<User>;
}
