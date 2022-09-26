import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthServiceInterface } from '@/auth/service/auth.service.interface';
import { User } from '@/schemas/user.schema';
import { UserProvider } from '@/user/provider/user.provider';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AuthService') private readonly authService: AuthServiceInterface,
        private readonly userProvider: UserProvider,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<User> {
        const user = this.userProvider.provideByEmail(email);
        if (!user) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
