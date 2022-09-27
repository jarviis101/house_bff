import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthServiceInterface } from '@/auth/service/auth.service.interface';
import { User } from '@/schemas/user.schema';
import { HashService } from '@/auth/service/hash.service';
import { UserProviderInterface } from '@/user/provider/user.provider.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AuthService') private readonly authService: AuthServiceInterface,
        @Inject('UserProvider') private readonly userProvider: UserProviderInterface,
        private readonly hashService: HashService,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.userProvider.provideByEmail(email);
        if (!user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        if (await this.hashService.compare(password, user.password)) {
            return user;
        }
    }
}
