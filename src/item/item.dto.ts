import { IsEnum, IsInt, IsString } from 'class-validator';
import { ItemType, ConditionType } from '@prisma/client';

export class CreateItemDto {
  @IsEnum(ItemType)
  item: ItemType;

  @IsString()
  name: string;

  @IsEnum(ConditionType)
  condition: ConditionType;

  @IsInt()
  donorId: number;

  @IsInt()
  schoolId: number;
}
