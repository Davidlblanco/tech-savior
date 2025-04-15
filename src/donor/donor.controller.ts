import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DonorService } from './donor.service';
import { CreateDonorDto } from './donor.dto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CPF } from 'src/utils/Cpf';
import { Mobile } from 'src/utils/Mobile';
import { ValidateDocument } from 'src/utils/ValidateDocument';

@ApiTags('Donors') // Group all endpoints under "Donors" in Swagger
@Controller('donors')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth() // Indicates that this endpoint requires authentication
  @ApiOperation({ summary: 'Create a new donor' })
  @ApiResponse({ status: 201, description: 'Donor created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createDonor(@Body() createDonorDto: CreateDonorDto) {
    try {
      createDonorDto.document = new ValidateDocument(
        createDonorDto.document,
      ).value;
      createDonorDto.mobile = new Mobile(createDonorDto.mobile).value;

      const donor = await this.donorService.createDonor(createDonorDto);

      return {
        id: donor.id,
        name: donor.name,
        message: 'Succesfully created!',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all donors' })
  @ApiResponse({
    status: 200,
    description: 'List of donors retrieved successfully.',
  })
  async getAllDonors(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return this.donorService.getAllDonors(Number(page), Number(limit), search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a donor by ID' })
  @ApiResponse({ status: 200, description: 'Donor retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Donor not found.' })
  async getDonorById(@Param('id') id: string) {
    const donor = await this.donorService.getDonorById(Number(id));
    if (!donor) {
      throw new HttpException('Donor not found', HttpStatus.NOT_FOUND);
    }
    return donor;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth() // Indicates that this endpoint requires authentication
  @ApiOperation({ summary: 'Update a donor by ID' })
  @ApiResponse({ status: 200, description: 'Donor updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updateDonor(
    @Param('id') id: string,
    @Body() updateDonorDto: Partial<CreateDonorDto>,
  ) {
    try {
      if (updateDonorDto.document)
        updateDonorDto.document = new ValidateDocument(
          updateDonorDto.document,
        ).value;
      if (updateDonorDto.mobile)
        updateDonorDto.mobile = new Mobile(updateDonorDto.mobile).value;
      const donor = await this.donorService.updateDonor(
        Number(id),
        updateDonorDto,
      );
      return { donor, message: 'Succesfully updated!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth() // Indicates that this endpoint requires authentication
  @ApiOperation({ summary: 'Delete a donor by ID' })
  @ApiResponse({ status: 200, description: 'Donor deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deleteDonor(@Param('id') id: string) {
    try {
      await this.donorService.deleteDonor(Number(id));
      return { message: 'Donor deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
