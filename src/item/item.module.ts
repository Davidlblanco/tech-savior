import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { BadgeService } from 'src/badges/badges.service';

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [ItemService, PrismaService, BadgeService],
})
export class ItemModule {}
