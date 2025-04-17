import { Test, TestingModule } from '@nestjs/testing';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './school.dto';

import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
describe('SchoolController', () => {
  let controller: SchoolController;

  const mockSchoolService = {
    createSchool: jest.fn(),
    getAllSchools: jest.fn(),
    getSchoolById: jest.fn(),
    updateSchool: jest.fn(),
    deleteSchool: jest.fn(),
  };
  const mockAuthGuard = {
    canActivate: jest.fn(() => true), // Allow all requests during testing
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolController],
      providers: [
        {
          provide: SchoolService,
          useValue: mockSchoolService,
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<SchoolController>(SchoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSchool', () => {
    it('should create a school', async () => {
      const dto: CreateSchoolDto = {
        name: 'Test School',
        street: '123 Test St',
        number: '456',
        postalCode: '03346100',
        neighbourhood: 'Test Neighbourhood',
        unprivilegedArea: true,
        urgency: 'THREE',
        quantityOfStudents: 500,
        availability: 'Mon-Fri 08:00-16:00',
        phone: '1198909878',
        email: 'test@school.com',
        password: '123456',
        latitude: -23.55052,
        longitude: -46.633308,
      };

      const expectedResult = {
        school: {
          ...dto,
        },
        message: 'Successfully created!',
      };

      delete expectedResult.school.password;

      mockSchoolService.createSchool.mockResolvedValue(expectedResult);

      const result = await controller.createSchool(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getAllSchools', () => {
    it('should return a paginated list of schools', async () => {
      const schools = [
        { id: 1, name: 'School 1' },
        { id: 2, name: 'School 2' },
      ];

      mockSchoolService.getAllSchools.mockResolvedValue(schools);

      const result = await controller.getAllSchools(1, 10, 'searchTerm');
      expect(result).toEqual(schools);
      expect(mockSchoolService.getAllSchools).toHaveBeenCalledWith(
        1,
        10,
        'searchTerm',
      );
    });
  });

  describe('getSchoolById', () => {
    it('should return a school by ID', async () => {
      const school = { id: 1, name: 'Test School' };

      mockSchoolService.getSchoolById.mockResolvedValue(school);

      const result = await controller.getSchoolById('1');
      expect(result).toEqual(school);
      expect(mockSchoolService.getSchoolById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if school is not found', async () => {
      mockSchoolService.getSchoolById.mockResolvedValue(null);

      await expect(controller.getSchoolById('1')).rejects.toThrowError(
        'School not found',
      );
    });
  });

  describe('updateSchool', () => {
    it('should update a school', async () => {
      const updateDto = { name: 'Updated School' };
      const updatedSchool = {
        school: { id: 1, ...updateDto },
        message: 'Successfully updated!',
      };

      mockSchoolService.updateSchool.mockResolvedValue(updatedSchool);

      const result = await controller.updateSchool('1', updateDto);
      expect(result).toEqual(updatedSchool);
      expect(mockSchoolService.updateSchool).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('deleteSchool', () => {
    it('should delete a school', async () => {
      mockSchoolService.deleteSchool.mockResolvedValue({
        message: 'School deleted successfully',
      });

      const result = await controller.deleteSchool('1');
      expect(result).toEqual({ message: 'School deleted successfully' });
      expect(mockSchoolService.deleteSchool).toHaveBeenCalledWith(1);
    });
  });
});
