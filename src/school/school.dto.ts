import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsEnum,
  IsEmail,
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

  @IsOptional()
  @IsInt()
  quantityOfStudents?: number;

  @IsString()
  availability: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;
}
