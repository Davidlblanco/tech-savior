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
import { ItemService } from './item.service';
import { CreateItemDto } from './item.dto';
import { AuthGuard } from '../auth/auth.guard';
import { BadgeService } from '../badges/badges.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Items')
@Controller('items')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly badgeService: BadgeService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createItem(@Body() createItemDto: CreateItemDto) {
    try {
      const itemCreateInput = {
        item: createItemDto.item,
        name: createItemDto.name,
        condition: createItemDto.condition,
        donor: { connect: { id: createItemDto.donorId } },
        school: { connect: { id: createItemDto.schoolId } },
      };

      const item = await this.itemService.createItem(itemCreateInput);
      await this.badgeService.handleDonnorBadges(item.donorId);
      return { id: item.id, name: item.name, message: 'Succesfully created!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({
    status: 200,
    description: 'List of items retrieved successfully.',
  })
  async getAllItems(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return this.itemService.getAllItems(Number(page), Number(limit), search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item by ID' })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  async getItemById(@Param('id') id: string) {
    const item = await this.itemService.getItemById(Number(id));
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an item by ID' })
  @ApiResponse({ status: 200, description: 'Item updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: Partial<CreateItemDto>,
  ) {
    try {
      const item = await this.itemService.updateItem(Number(id), updateItemDto);
      return { item, message: 'Succesfully updated!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async deleteItem(@Param('id') id: string) {
    try {
      await this.itemService.deleteItem(Number(id));
      return { message: 'Item deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
