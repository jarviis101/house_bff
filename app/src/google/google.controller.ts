import { GoogleServiceInterface } from './service/google.service.interface';
import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guard/google-oauth.guard';

@Controller('google')
export class GoogleController {
    constructor(@Inject('GoogleInterface') private readonly googleService: GoogleServiceInterface) {}

    @Get()
    @UseGuards(GoogleOauthGuard)
    async googleAuth(@Req() req) {}

    @Get('redirect')
    @UseGuards(GoogleOauthGuard)
    async googleAuthRedirect(@Req() req) {
        console.log(req.user);
    }
}
