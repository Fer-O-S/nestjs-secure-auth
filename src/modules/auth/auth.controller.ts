import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { loginDto } from './dtos/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @Post()
    async Login(@Body() loginDto:loginDto) {
        return await this.authService.login(loginDto);
    }
}
