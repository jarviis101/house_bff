import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GoogleModule } from './google/google.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [UserModule, GoogleModule, AuthModule, MongooseModule.forRoot(`${process.env.MONGOOSE_URI}`)],
    controllers: [],
    providers: [],
})
export class AppModule {}
