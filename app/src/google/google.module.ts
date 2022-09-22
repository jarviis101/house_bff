import { Module } from '@nestjs/common';
import { GoogleService } from './service/google.service';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/user/user.module';

@Module({
    imports: [ConfigModule, UserModule],
    providers: [
        {
            provide: 'GoogleInterface',
            useClass: GoogleService,
        },
        GoogleStrategy,
    ],
    controllers: [GoogleController],
})
export class GoogleModule {}
