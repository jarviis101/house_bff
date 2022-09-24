import { Injectable } from '@nestjs/common';
import { LoginResponseModel } from '@/auth/model/login-response.model';
import { JwtService } from '@nestjs/jwt';
import { AuthServiceInterface } from '@/auth/service/auth.service.interface';
import { User } from '@/schemas/user.schema';

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(private readonly jwtService: JwtService) {}
    async authorize(user: User): Promise<LoginResponseModel> {
        return new LoginResponseModel(this.jwtService.sign({ user }));
    }
}
