import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/schemas/user.schema';
import { UserProvider } from '@/user/provider/user.provider';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UserService, UserProvider],
    exports: [UserService, UserProvider],
})
export class UserModule {}
