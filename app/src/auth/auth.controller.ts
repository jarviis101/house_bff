import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthServiceInterface } from '@/auth/service/auth.service.interface';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';
import { User } from '@/schemas/user.schema';
import { LocalAuthGuard } from '@/auth/guard/local-auth.guard';
import { AuthorizedDTO } from '@/auth/dto/authorized.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AuthService') private readonly authService: AuthServiceInterface) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req): Promise<AuthorizedDTO> {
        return this.authService.authorize(req.user);
    }

    @Post('register')
    async register(@Body() dto: CreateUserDTO): Promise<User> {
        return this.authService.register(dto);
    }
}
