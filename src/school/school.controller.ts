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
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './school.dto';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Schools')
@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new school' })
  @ApiResponse({ status: 201, description: 'Successfully created!' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    try {
      createSchoolDto.password = await bcrypt.hash(
        createSchoolDto.password,
        10,
      );
      const school = await this.schoolService.createSchool(createSchoolDto);
      delete school.password;
      return { school, message: 'Successfully created!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all schools' })
  @ApiResponse({
    status: 200,
    description: 'List of schools retrieved successfully.',
  })
  async getAllSchools(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return this.schoolService.getAllSchools(
      Number(page),
      Number(limit),
      search,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a school by ID' })
  @ApiResponse({ status: 200, description: 'School retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'School not found.' })
  async getSchoolById(@Param('id') id: string) {
    const school = await this.schoolService.getSchoolById(Number(id));
    if (!school) {
      throw new HttpException('School not found', HttpStatus.NOT_FOUND);
    }
    return school;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a school by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated!' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updateSchool(
    @Param('id') id: string,
    @Body() updateSchoolDto: Partial<CreateSchoolDto>,
  ) {
    try {
      const school = await this.schoolService.updateSchool(
        Number(id),
        updateSchoolDto,
      );
      delete school.password;
      return { school, message: 'Successfully updated!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a school by ID' })
  @ApiResponse({ status: 200, description: 'School deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deleteSchool(@Param('id') id: string) {
    try {
      await this.schoolService.deleteSchool(Number(id));
      return { message: 'School deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
