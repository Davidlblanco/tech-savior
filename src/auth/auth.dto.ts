import { IsString, IsEmail } from 'class-validator';

export class LoginSchoolDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
