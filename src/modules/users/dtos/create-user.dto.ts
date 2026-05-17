import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({example: "Fernando", description: "Write your name"})    
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty({example: "fer@example.com", description: "Write your email"})    
    @IsNotEmpty()
    @IsEmail()
    email!: string;
    
    @ApiProperty({example: "Password123*", description: "Write your password"})    
    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class UpdateUser extends PartialType(OmitType(CreateUserDto, ['email','password'] as const)){}