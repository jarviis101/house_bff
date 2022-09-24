import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guard/google-oauth.guard';
import { AuthServiceInterface } from '@/auth/service/auth.service.interface';
import { LoginResponseModel } from '@/auth/model/login-response.model';

@Controller('auth/google')
export class GoogleController {
    constructor(@Inject('AuthService') private readonly authService: AuthServiceInterface) {}

    @Get()
    @UseGuards(GoogleOauthGuard)
    async googleAuth(@Req() req) {}

    @Get('redirect')
    @UseGuards(GoogleOauthGuard)
    async googleAuthRedirect(@Req() req): Promise<LoginResponseModel> {
        return this.authService.authorize(req.user);
    }
}
