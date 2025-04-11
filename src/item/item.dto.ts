import { IsEnum, IsInt, IsString } from 'class-validator';
import { ItemType, ConditionType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'Type of the item',
    enum: ItemType,
  })
  @IsEnum(ItemType)
  item: ItemType;

  @ApiProperty({ description: 'Name of the item' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Condition of the item',
    enum: ConditionType,
  })
  @IsEnum(ConditionType)
  condition: ConditionType;

  @ApiProperty({ description: 'ID of the donor associated with the item' })
  @IsInt()
  donorId: number;

  @ApiProperty({ description: 'ID of the school associated with the item' })
  @IsInt()
  schoolId: number;
}
