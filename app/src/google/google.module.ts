import { Module } from '@nestjs/common';
import { GoogleService } from './service/google.service';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
    imports: [ConfigModule, UserModule, AuthModule],
    providers: [
        {
            provide: 'GoogleService',
            useClass: GoogleService,
        },
        GoogleStrategy,
    ],
    controllers: [GoogleController],
})
export class GoogleModule {}
