import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './is-public.decorator';
import LoginDataDTO from './types/login-data.dto';

@IsPublic()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginData: LoginDataDTO){
        const { email, password } = loginData;

        return this.authService.login(email, password);
    }
}
