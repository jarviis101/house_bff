import { Inject, Injectable } from '@nestjs/common';
import { LoginResponseModel } from '@/auth/model/login-response.model';
import { JwtService } from '@nestjs/jwt';
import { AuthServiceInterface } from '@/auth/service/auth.service.interface';
import { User } from '@/schemas/user.schema';
import { UserServiceInterface } from '@/user/service/user.service.interface';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';
import { UserProvider } from '@/user/provider/user.provider';
import { UserAlreadyExistException } from '@/user/exception/user-already-exist.exception';
import { HashService } from '@/auth/service/hash.service';

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        private readonly jwtService: JwtService,
        @Inject('UserService') private readonly userService: UserServiceInterface,
        private readonly userProvider: UserProvider,
        private readonly hashService: HashService,
    ) {}
    async authorize(user: User): Promise<LoginResponseModel> {
        return new LoginResponseModel(this.jwtService.sign({ user }));
    }

    async register(dto: CreateUserDTO): Promise<User> {
        if (await this.userProvider.provideByEmail(dto.email)) {
            throw new UserAlreadyExistException(`User ${dto.email} already exist`);
        }
        dto.password = await this.hashPassword(dto.password);
        return this.userService.createByBaseAuth(dto);
    }

    private async hashPassword(password: string): Promise<string> {
        return await this.hashService.hash(password);
    }
}
