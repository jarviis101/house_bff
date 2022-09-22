import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/service/user.service';
import { Profile } from 'passport-google-oauth20';
import { GoogleServiceInterface } from '@/google/service/google.service.interface';
import { User } from '@/user/dto/user.dto';
import { User as UserSchema } from '@/schemas/user.schema';
import { UserProvider } from '@/user/provider/user.provider';

@Injectable()
export class GoogleService implements GoogleServiceInterface {
    constructor(private userService: UserService, private userProvider: UserProvider) {}
    async authorize(profile: Profile): Promise<UserSchema> {
        const email: string = profile.emails[0].value;
        const name: string = profile.name.givenName;
        const user = await this.userProvider.provideByEmail(email);
        if (user) {
            return user;
        }
        return this.userService.create(new User(name, email));
    }
}
