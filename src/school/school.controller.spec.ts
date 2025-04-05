import { Test, TestingModule } from '@nestjs/testing';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './school.dto';
import * as bcrypt from 'bcrypt';

describe('SchoolController', () => {
  let controller: SchoolController;

  const mockSchoolService = {
    createSchool: jest.fn(),
    getAllSchools: jest.fn(),
    getSchoolById: jest.fn(),
    updateSchool: jest.fn(),
    deleteSchool: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolController],
      providers: [
        {
          provide: SchoolService,
          useValue: mockSchoolService,
        },
      ],
    }).compile();

    controller = module.get<SchoolController>(SchoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSchool', () => {
    it('should create a school with a hashed password', async () => {
      const dto: CreateSchoolDto = {
        name: 'Test School',
        street: '123 Test St',
        number: '456',
        postalCode: '12345',
        neighbourhood: 'Test Neighbourhood',
        unprivilegedArea: true,
        urgency: 'THREE',
        quantityOfStudents: 500,
        availability: 'Mon-Fri 08:00-16:00',
        phone: '1234567890',
        email: 'test@school.com',
        password: '123456',
      };

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const expectedResult = { ...dto, password: hashedPassword };

      mockSchoolService.createSchool.mockResolvedValue(expectedResult);

      const result = await controller.createSchool(dto);
      expect(result).toEqual(expectedResult);
      expect(mockSchoolService.createSchool).toHaveBeenCalledWith({
        ...dto,
        password: hashedPassword,
      });
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
      const updatedSchool = { id: 1, ...updateDto };

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
