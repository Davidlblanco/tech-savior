import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { SchoolController } from './school/school.controller';
import { SchoolService } from './school/school.service';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { DonorController } from './donor/donor.controller';
import { DonorService } from './donor/donor.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    SchoolController,
    ItemController,
    DonorController,
  ],
  providers: [
    AppService,
    PrismaService,
    SchoolService,
    ItemService,
    DonorService,
  ],
})
export class AppModule {}
