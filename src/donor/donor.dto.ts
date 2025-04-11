import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDonorDto {
  @ApiProperty({ description: 'Email address of the donor' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Website of the donor' })
  @IsString()
  site: string;

  @ApiProperty({
    description: 'Name of the donor',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Document number of the donor' })
  @IsString()
  document: string;

  @ApiProperty({ description: 'Mobile number of the donor' })
  @IsString()
  mobile: string;
}
