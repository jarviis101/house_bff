import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GoogleModule } from './google/google.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        UserModule,
        GoogleModule,
        AuthModule,
        MongooseModule.forRoot(`${process.env.MONGOOSE_URI}`),
        HttpModule.register({
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
