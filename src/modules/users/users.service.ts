import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dtos/create-user.dto';
import { ResponseUserDto } from './dtos/response-user.dto';
import * as bycrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor (private readonly prisma: PrismaService){}

    async createUser (data: CreateUserDto){
        const normalizedEmail = data.email.trim().toLowerCase();

        const existingEmail= await this.prisma.user.findUnique({
            where: {email: normalizedEmail}
        });

        if (existingEmail){
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bycrypt.hash(data.password, 10)
        const createdUser = await this.prisma.user.create({
            data: {
                name:data.name,
                email: normalizedEmail,
                password: hashedPassword,
            }
        });
        
        return { id: createdUser.id};
    } 

    async updateUser (id: number, data: UpdateUserDto){
        const existingId= await this.prisma.user.findUnique({
            where: { id }
        });

        if ( !existingId ) {
            throw new NotFoundException('user not found') 
        }

        if (data.password) {
            data.password = await bycrypt.hash(data.password, 10);
        }

        await this.prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                password: data.password
            }
        });
    }

    async getAllUser(): Promise<ResponseUserDto[]> {
        return await this.prisma.user.findMany(
            {
                select:{
                    id: true,
                    name: true,
                    email: true
                }
            }
        );
    }
}
