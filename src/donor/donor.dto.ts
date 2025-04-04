import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateDonorDto {
  @IsEmail()
  email: string;

  @IsString()
  site: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  document: string;

  @IsString()
  mobile: string;
}
