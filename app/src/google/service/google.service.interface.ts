import { Profile } from 'passport-google-oauth20';
import { User } from '@/schemas/user.schema';

export interface GoogleServiceInterface {
    authorize(profile: Profile): Promise<User>;
}
