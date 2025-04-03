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
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './school.dto';

@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  async createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    try {
      return await this.schoolService.createSchool(createSchoolDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllSchools(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.schoolService.getAllSchools(Number(page), Number(limit));
  }

  @Get(':id')
  async getSchoolById(@Param('id') id: string) {
    const school = await this.schoolService.getSchoolById(Number(id));
    if (!school) {
      throw new HttpException('School not found', HttpStatus.NOT_FOUND);
    }
    return school;
  }

  @Put(':id')
  async updateSchool(
    @Param('id') id: string,
    @Body() updateSchoolDto: Partial<CreateSchoolDto>,
  ) {
    try {
      return await this.schoolService.updateSchool(Number(id), updateSchoolDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteSchool(@Param('id') id: string) {
    try {
      await this.schoolService.deleteSchool(Number(id));
      return { message: 'School deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
