import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [SchoolController],
  providers: [SchoolService, PrismaService],
})
export class SchoolModule {}
