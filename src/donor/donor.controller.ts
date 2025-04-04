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
} from '@nestjs/common';
import { DonorService } from './donor.service';
import { CreateDonorDto } from './donor.dto';

@Controller('donors')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Post()
  async createDonor(@Body() createDonorDto: CreateDonorDto) {
    try {
      return await this.donorService.createDonor(createDonorDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllDonors(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return this.donorService.getAllDonors(Number(page), Number(limit), search);
  }

  @Get(':id')
  async getDonorById(@Param('id') id: string) {
    const donor = await this.donorService.getDonorById(Number(id));
    if (!donor) {
      throw new HttpException('Donor not found', HttpStatus.NOT_FOUND);
    }
    return donor;
  }

  @Put(':id')
  async updateDonor(
    @Param('id') id: string,
    @Body() updateDonorDto: Partial<CreateDonorDto>,
  ) {
    try {
      return await this.donorService.updateDonor(Number(id), updateDonorDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteDonor(@Param('id') id: string) {
    try {
      await this.donorService.deleteDonor(Number(id));
      return { message: 'Donor deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
