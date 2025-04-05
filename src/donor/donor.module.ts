import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DonorController } from './donor.controller';
import { DonorService } from './donor.service';

@Module({
  imports: [],
  controllers: [DonorController],
  providers: [DonorService, PrismaService],
})
export class DonorModule {}
