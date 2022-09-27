import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthServiceInterface } from '@/auth/service/auth.service.interface';
import { User } from '@/schemas/user.schema';
import { UserServiceInterface } from '@/user/service/user.service.interface';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';
import { UserAlreadyExistException } from '@/user/exception/user-already-exist.exception';
import { HashService } from '@/auth/service/hash.service';
import { AuthorizedDTO } from '@/auth/dto/authorized.dto';
import { JwtPayloadType } from '@/auth/type/jwt-payload.type';
import { UserProviderInterface } from '@/user/provider/user.provider.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        @Inject('UserService') private readonly userService: UserServiceInterface,
        @Inject('UserProvider') private readonly userProvider: UserProviderInterface,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ) {}
    async authorize(user: User): Promise<AuthorizedDTO> {
        return new AuthorizedDTO(this.jwtService.sign({ id: user._id, email: user.email } as JwtPayloadType));
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
