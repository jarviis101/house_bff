import { Module } from '@nestjs/common';
import { GoogleService } from './service/google.service';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
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
