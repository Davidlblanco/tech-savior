import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsEnum,
  IsEmail,
  MinLength,
} from 'class-validator';
import { UrgencyLevel } from '@prisma/client';

export class CreateSchoolDto {
  @IsString()
  name: string;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsString()
  postalCode: string;

  @IsString()
  neighbourhood: string;

  @IsBoolean()
  unprivilegedArea: boolean;

  @IsEnum(UrgencyLevel)
  urgency: UrgencyLevel;

  @IsInt()
  quantityOfStudents: number;

  @IsString()
  availability: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
