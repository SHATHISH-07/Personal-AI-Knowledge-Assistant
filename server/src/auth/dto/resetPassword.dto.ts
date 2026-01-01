import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    token: string;

    @MinLength(8)
    password: string;
}
