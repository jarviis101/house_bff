import { LoginResponseModel } from '@/auth/model/login-response.model';
import { User } from '@/schemas/user.schema';

export interface AuthServiceInterface {
    authorize(user: User): Promise<LoginResponseModel>;
}
