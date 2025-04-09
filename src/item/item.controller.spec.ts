import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { BadgeService } from '../badges/badges.service';
import { CreateItemDto } from './item.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

describe('ItemController', () => {
  let controller: ItemController;

  const mockItemService = {
    createItem: jest.fn(),
    getAllItems: jest.fn(),
    getItemById: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
  };
  const mockAuthGuard = {
    canActivate: jest.fn(() => true), // Allow all requests during testing
  };
  const mockBadgeService = {
    handleDonnorBadges: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: mockItemService,
        },
        {
          provide: BadgeService,
          useValue: mockBadgeService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createItem', () => {
    it('should create an item and handle donor badges', async () => {
      const dto: CreateItemDto = {
        item: 'NOTEBOOKS',
        name: 'Notebook Dell',
        condition: 'GOOD',
        donorId: 1,
        schoolId: 1,
      };

      const createdItem = {
        id: 1,
        ...dto,
      };

      mockItemService.createItem.mockResolvedValue(createdItem);
      mockBadgeService.handleDonnorBadges.mockResolvedValue(undefined);

      const result = await controller.createItem(dto);

      expect(result).toEqual({
        id: createdItem.id,
        name: createdItem.name,
        message: 'Succesfully created!',
      });
      expect(mockItemService.createItem).toHaveBeenCalledWith({
        item: dto.item,
        name: dto.name,
        condition: dto.condition,
        donor: { connect: { id: dto.donorId } },
        school: { connect: { id: dto.schoolId } },
      });
      expect(mockBadgeService.handleDonnorBadges).toHaveBeenCalledWith(
        createdItem.donorId,
      );
    });

    it('should throw an error if creation fails', async () => {
      const dto: CreateItemDto = {
        item: 'NOTEBOOKS',
        name: 'Notebook Dell',
        condition: 'GOOD',
        donorId: 1,
        schoolId: 1,
      };

      mockItemService.createItem.mockRejectedValue(
        new HttpException('Error creating item', HttpStatus.BAD_REQUEST),
      );

      await expect(controller.createItem(dto)).rejects.toThrowError(
        'Error creating item',
      );
    });
  });

  describe('getAllItems', () => {
    it('should return a paginated list of items', async () => {
      const items = [
        { id: 1, name: 'Notebook Dell', item: 'NOTEBOOKS' },
        { id: 2, name: 'Monitor Samsung', item: 'MONITOR' },
      ];

      mockItemService.getAllItems.mockResolvedValue(items);

      const result = await controller.getAllItems(1, 10, 'searchTerm');
      expect(result).toEqual(items);
      expect(mockItemService.getAllItems).toHaveBeenCalledWith(
        1,
        10,
        'searchTerm',
      );
    });
  });

  describe('getItemById', () => {
    it('should return an item by ID', async () => {
      const item = { id: 1, name: 'Notebook Dell', item: 'NOTEBOOKS' };

      mockItemService.getItemById.mockResolvedValue(item);

      const result = await controller.getItemById('1');
      expect(result).toEqual(item);
      expect(mockItemService.getItemById).toHaveBeenCalledWith(1);
    });

    it('should throw an error if item is not found', async () => {
      mockItemService.getItemById.mockResolvedValue(null);

      await expect(controller.getItemById('1')).rejects.toThrowError(
        'Item not found',
      );
    });
  });

  describe('updateItem', () => {
    it('should update an item', async () => {
      const updateDto = { name: 'Updated Notebook' };
      const updatedItem = { id: 1, ...updateDto };

      mockItemService.updateItem.mockResolvedValue(updatedItem);

      const result = await controller.updateItem('1', updateDto);
      expect(result).toEqual({
        item: updatedItem,
        message: 'Succesfully updated!',
      });
      expect(mockItemService.updateItem).toHaveBeenCalledWith(1, updateDto);
    });

    it('should throw an error if update fails', async () => {
      const updateDto = { name: 'Updated Notebook' };

      mockItemService.updateItem.mockRejectedValue(
        new HttpException('Error updating item', HttpStatus.BAD_REQUEST),
      );

      await expect(controller.updateItem('1', updateDto)).rejects.toThrowError(
        'Error updating item',
      );
    });
  });

  describe('deleteItem', () => {
    it('should delete an item', async () => {
      mockItemService.deleteItem.mockResolvedValue({});

      const result = await controller.deleteItem('1');
      expect(result).toEqual({ message: 'Item deleted successfully' });
      expect(mockItemService.deleteItem).toHaveBeenCalledWith(1);
    });

    it('should throw an error if deletion fails', async () => {
      mockItemService.deleteItem.mockRejectedValue(
        new HttpException('Error deleting item', HttpStatus.BAD_REQUEST),
      );

      await expect(controller.deleteItem('1')).rejects.toThrowError(
        'Error deleting item',
      );
    });
  });
});
