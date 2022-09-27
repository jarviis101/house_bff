import { Inject, Injectable } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';
import { GoogleServiceInterface } from '@/google/service/google.service.interface';
import { User } from '@/schemas/user.schema';
import { UserServiceInterface } from '@/user/service/user.service.interface';
import { GoogleUserDTO } from '@/google/dto/google-user.dto';
import { UserProviderInterface } from '@/user/provider/user.provider.interface';

@Injectable()
export class GoogleService implements GoogleServiceInterface {
    constructor(
        @Inject('UserService') private readonly userService: UserServiceInterface,
        @Inject('UserProvider') private readonly userProvider: UserProviderInterface,
    ) {}
    async authorize(profile: Profile): Promise<User> {
        const email: string = profile.emails[0].value;
        const name: string = profile.name.givenName;
        const user = await this.userProvider.provideByEmail(email);
        if (user) {
            return user;
        }
        return this.userService.createByGoogleAuth(new GoogleUserDTO(name, email));
    }
}
