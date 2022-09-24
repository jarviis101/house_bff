import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { GoogleServiceInterface } from '@/google/service/google.service.interface';
import { User } from '@/schemas/user.schema';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly configService: ConfigService,
        @Inject('GoogleService') private readonly googleService: GoogleServiceInterface,
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_SECRET'),
            callbackURL: configService.get<string>('GOOGLE_REDIRECT_URL'),
            scope: ['profile', 'email'],
        });
    }

    async validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<User> {
        return this.googleService.authorize(profile);
    }
}
