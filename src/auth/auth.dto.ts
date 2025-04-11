import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginSchoolDto {
  @ApiProperty({ description: 'Email address of the school' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the school' })
  @IsString()
  password: string;
}
