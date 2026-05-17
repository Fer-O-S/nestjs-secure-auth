import { Body, Controller, Param, ParseIntPipe, Patch, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUser } from './dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor (private readonly UserService:UsersService){}

    @Post()
    async CreateUser(@Body() CreateUserDto: CreateUserDto){
        const createuser = await this.UserService.createUser(CreateUserDto);
        return createuser
    }

    @Patch(':id')
    async UpdateUser(@Param('id', ParseIntPipe) id:number, @Body() dto: UpdateUser ) {
        await this.UserService.updateUser(id,dto)
        return 'User update'
    }

    @Get()
    async GetAllUser() {
        return await this.UserService.getAllUser();
    }

}
