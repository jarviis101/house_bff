import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas/user.schema';
import { UserProvider } from '@/user/provider/user.provider';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [
        {
            provide: 'UserService',
            useClass: UserService,
        },
        {
            provide: 'UserProvider',
            useClass: UserProvider,
        },
    ],
    exports: [
        {
            provide: 'UserService',
            useClass: UserService,
        },
        {
            provide: 'UserProvider',
            useClass: UserProvider,
        },
    ],
})
export class UserModule {}
