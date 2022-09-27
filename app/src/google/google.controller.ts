import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthServiceInterface } from '@/auth/service/auth.service.interface';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizedDTO } from '@/auth/dto/authorized.dto';

@Controller('auth/google')
export class GoogleController {
    constructor(@Inject('AuthService') private readonly authService: AuthServiceInterface) {}

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req): Promise<AuthorizedDTO> {
        return this.authService.authorize(req.user);
    }
}
