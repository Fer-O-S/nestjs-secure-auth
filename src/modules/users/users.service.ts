import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CreateUserDto, UpdateUser } from './dtos/create-user.dto';
import { ResponseUserDto } from './dtos/response-user.dto';

@Injectable()
export class UsersService {
    constructor (private readonly prisma: PrismaService){}

    async createUser (data: CreateUserDto){
        const existingEmail= await this.prisma.user.findFirst({
            where: {email: data.email}
        });

        if (existingEmail){
            throw new BadRequestException('This email existing');
        }

        const usercreate = await this.prisma.user.create({data: data});
        
        return { id: usercreate.id};
    } 

    async updateUser (id: number, data: UpdateUser){
        const existingId= await this.prisma.user.findUnique({
            where: { id }
        });

        if ( !existingId ) {
            throw new NotFoundException('user not found') 
        }

        await this.prisma.user.update({
            where: { id },
            data: {
                name: data.name
            }
        });
    }

    async getAllUser(): Promise<ResponseUserDto[]> {
        return await this.prisma.user.findMany();
    }
}
