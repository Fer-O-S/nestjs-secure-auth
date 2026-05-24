import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { loginDto } from './dtos/login.dto';
import * as bycrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (private readonly prisma: PrismaService){}

    async login (data: loginDto) {
        const normalizedEmail = data.email.trim().toLowerCase();

        
        const user = await this.prisma.user.findUnique({
            where: {
                email: normalizedEmail
            }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (!user || !await bycrypt.compare(data.password, user.password)){
            return ('Invalid credentials');
        }

        const {password: _, ...result}=user;
        return 'Login exitoso'
    }
}
