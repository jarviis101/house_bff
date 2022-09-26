import { LoginResponseModel } from '@/auth/model/login-response.model';
import { User } from '@/schemas/user.schema';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';

export interface AuthServiceInterface {
    authorize(user: User): Promise<LoginResponseModel>;
    register(dto: CreateUserDTO): Promise<User>;
}
