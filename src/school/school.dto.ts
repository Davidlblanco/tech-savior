import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsEnum,
  IsEmail,
  MinLength,
  Min,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UrgencyLevel } from '@prisma/client';

export class CreateSchoolDto {
  @ApiProperty({ description: 'Name of the school' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Street address of the school' })
  @IsString()
  street: string;

  @ApiProperty({ description: 'Street number of the school' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'Postal code of the school' })
  @IsString()
  postalCode: string;

  @ApiProperty({ description: 'Neighbourhood of the school' })
  @IsString()
  neighbourhood: string;

  @ApiProperty({ description: 'Whether the school is in an unprivileged area' })
  @IsBoolean()
  unprivilegedArea: boolean;

  @ApiProperty({
    description: 'Urgency level of the school',
    enum: UrgencyLevel,
  })
  @IsEnum(UrgencyLevel)
  urgency: UrgencyLevel;

  @ApiProperty({
    description: 'Number of students in the school',
    minimum: 1,
  })
  @IsInt()
  @Min(1, { message: 'Quantity of students must be greater than 0' })
  quantityOfStudents: number;

  @ApiProperty({ description: 'Availability schedule of the school' })
  @IsString()
  availability: string;

  @ApiProperty({
    description: 'Phone number of the school',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Email address of the school' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the school account',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ description: 'Latitude of the school' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the school' })
  @IsNumber()
  longitude: number;
}
