import { User } from '@/schemas/user.schema';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';
import { AuthorizedDTO } from '@/auth/dto/authorized.dto';

export interface AuthServiceInterface {
    authorize(user: User): Promise<AuthorizedDTO>;
    register(dto: CreateUserDTO): Promise<User>;
}
