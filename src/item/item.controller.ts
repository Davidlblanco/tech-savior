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
import { ItemService } from './item.service';
import { CreateItemDto } from './item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
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
      return { id: item.id, name: item.name, message: 'Succesfully created!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllItems(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return this.itemService.getAllItems(Number(page), Number(limit), search);
  }

  @Get(':id')
  async getItemById(@Param('id') id: string) {
    const item = await this.itemService.getItemById(Number(id));
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  @Put(':id')
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
  async deleteItem(@Param('id') id: string) {
    try {
      await this.itemService.deleteItem(Number(id));
      return { message: 'Item deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
