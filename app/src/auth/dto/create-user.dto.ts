import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
