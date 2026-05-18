import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDto {
    @ApiProperty({example: 'fos@example.com', description: 'Write your email'})
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({example: 'Password123!', description: 'Write your password'})
    @IsString()
    @IsNotEmpty()
    password!: string;
}   