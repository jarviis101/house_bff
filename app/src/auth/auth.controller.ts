import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthServiceInterface } from '@/auth/service/auth.service.interface';
import { LoginResponseModel } from '@/auth/model/login-response.model';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AuthService') private readonly authService: AuthServiceInterface) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Req() req): Promise<LoginResponseModel> {
        return this.authService.authorize(req.user);
    }

    @Post('register')
    async register(@Body() dto: CreateUserDTO) {
        return this.authService.register(dto);
    }
}
