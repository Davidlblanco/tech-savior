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

@Controller('donors')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createDonor(@Body() createDonorDto: CreateDonorDto) {
    try {
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
  @UseGuards(AuthGuard)
  async updateDonor(
    @Param('id') id: string,
    @Body() updateDonorDto: Partial<CreateDonorDto>,
  ) {
    try {
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
  async deleteDonor(@Param('id') id: string) {
    try {
      await this.donorService.deleteDonor(Number(id));
      return { message: 'Donor deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
