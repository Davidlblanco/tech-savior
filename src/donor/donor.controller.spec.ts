import { Test, TestingModule } from '@nestjs/testing';
import { DonorController } from './donor.controller';
import { DonorService } from './donor.service';
import { CreateDonorDto } from './donor.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('DonorController', () => {
  let controller: DonorController;

  const mockDonorService = {
    createDonor: jest.fn(),
    getAllDonors: jest.fn(),
    getDonorById: jest.fn(),
    updateDonor: jest.fn(),
    deleteDonor: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true), // Allow all requests during testing
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonorController],
      providers: [
        {
          provide: DonorService,
          useValue: mockDonorService,
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

    controller = module.get<DonorController>(DonorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createDonor', () => {
    it('should create a donor', async () => {
      const dto: CreateDonorDto = {
        email: 'donor@example.com',
        site: 'www.example.com',
        name: 'Generous Donor',
        document: '625.928.640-67',
        mobile: '11987698888',
      };

      const createdDonor = { id: 1, ...dto };

      mockDonorService.createDonor.mockResolvedValue({
        id: createdDonor.id,
        name: createdDonor.name,
        message: 'Succesfully created!',
      });

      const result = await controller.createDonor(dto);

      expect(result).toEqual({
        id: createdDonor.id,
        name: createdDonor.name,
        message: 'Succesfully created!',
      });
      expect(mockDonorService.createDonor).toHaveBeenCalledWith(dto);
    });

    it('should throw an error if creation fails', async () => {
      const dto: CreateDonorDto = {
        email: 'donor@example.com',
        site: 'www.example.com',
        name: 'Generous Donor',
        document: '625.928.640-67',
        mobile: '11987698888',
      };

      mockDonorService.createDonor.mockRejectedValue(
        new HttpException('Error creating donor', HttpStatus.BAD_REQUEST),
      );

      await expect(controller.createDonor(dto)).rejects.toThrowError(
        'Error creating donor',
      );
    });
  });

  describe('getAllDonors', () => {
    it('should return a paginated list of donors', async () => {
      const donors = [
        { id: 1, name: 'Donor 1', email: 'donor1@example.com' },
        { id: 2, name: 'Donor 2', email: 'donor2@example.com' },
      ];

      mockDonorService.getAllDonors.mockResolvedValue(donors);

      const result = await controller.getAllDonors(1, 10, 'searchTerm');
      expect(result).toEqual(donors);
      expect(mockDonorService.getAllDonors).toHaveBeenCalledWith(
        1,
        10,
        'searchTerm',
      );
    });
  });

  describe('getDonorById', () => {
    it('should return a donor by ID', async () => {
      const donor = { id: 1, name: 'Donor 1', email: 'donor1@example.com' };

      mockDonorService.getDonorById.mockResolvedValue(donor);

      const result = await controller.getDonorById('1');
      expect(result).toEqual(donor);
      expect(mockDonorService.getDonorById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if donor is not found', async () => {
      mockDonorService.getDonorById.mockResolvedValue(null);

      await expect(controller.getDonorById('1')).rejects.toThrowError(
        'Donor not found',
      );
    });
  });

  describe('updateDonor', () => {
    it('should update a donor', async () => {
      const updateDto = { name: 'Updated Donor' };
      const updatedDonor = { id: 1, ...updateDto };

      mockDonorService.updateDonor.mockResolvedValue(updatedDonor);

      const result = await controller.updateDonor('1', updateDto);
      expect(result).toEqual({
        donor: updatedDonor,
        message: 'Succesfully updated!',
      });
      expect(mockDonorService.updateDonor).toHaveBeenCalledWith(1, updateDto);
    });

    it('should throw an error if update fails', async () => {
      const updateDto = { name: 'Updated Donor' };

      mockDonorService.updateDonor.mockRejectedValue(
        new HttpException('Error updating donor', HttpStatus.BAD_REQUEST),
      );

      await expect(controller.updateDonor('1', updateDto)).rejects.toThrowError(
        'Error updating donor',
      );
    });
  });

  describe('deleteDonor', () => {
    it('should delete a donor', async () => {
      mockDonorService.deleteDonor.mockResolvedValue({});

      const result = await controller.deleteDonor('1');
      expect(result).toEqual({ message: 'Donor deleted successfully' });
      expect(mockDonorService.deleteDonor).toHaveBeenCalledWith(1);
    });

    it('should throw an error if deletion fails', async () => {
      mockDonorService.deleteDonor.mockRejectedValue(
        new HttpException('Error deleting donor', HttpStatus.BAD_REQUEST),
      );

      await expect(controller.deleteDonor('1')).rejects.toThrowError(
        'Error deleting donor',
      );
    });
  });
});
