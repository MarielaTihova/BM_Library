
import { IsString, Length } from "class-validator"
export class RegisterUserDTO {
    @IsString()
    @Length(5, 30)
    username: string;
    @IsString()
    @Length(5, 30)
    personalName: string;
    @IsString()

    password: string;
    @IsString()
    avatar: string;
}