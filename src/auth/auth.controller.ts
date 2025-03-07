import { Controller, Post, Body, Request, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { username: string, password: string }) {
        return this.authService.validateUser(body.username, body.password)
        .then(user => this.authService.login(user));
    }

    @Post('register') 
    async register(@Body() body: { username: string, password: string }) {
        return this.authService.register(body.username, body.password);
    }

    @Post('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }
}