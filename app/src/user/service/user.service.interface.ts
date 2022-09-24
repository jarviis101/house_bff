import { UserInterface } from '@/google/dto/user.dto.interface';
import { User } from '@/schemas/user.schema';

export interface UserServiceInterface {
    create(dto: UserInterface): Promise<User>;
}
