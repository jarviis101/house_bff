import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '@/auth/service/auth.service';
import { AuthController } from '@/auth/auth.controller';
import { UserModule } from '@/user/user.module';
import { HashService } from '@/auth/service/hash.service';

@Module({
    imports: [
        UserModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        {
            provide: 'AuthService',
            useClass: AuthService,
        },
        HashService,
    ],
    exports: [
        {
            provide: 'AuthService',
            useClass: AuthService,
        },
    ],
    controllers: [AuthController],
})
export class AuthModule {}
