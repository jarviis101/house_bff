import { User } from '@/schemas/user.schema';

export interface UserProviderInterface {
    provideByEmail(email: string): Promise<User>;
}
