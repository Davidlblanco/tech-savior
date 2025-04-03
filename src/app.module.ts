import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { SchoolController } from './school/school.controller';
import { SchoolService } from './school/school.service';

@Module({
  imports: [],
  controllers: [AppController, SchoolController],
  providers: [AppService, PrismaService, SchoolService],
})
export class AppModule {}
