import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { PrismaService } from 'src/prisma.service';
import { SchoolService } from 'src/school/school.service';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [
    SchoolModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, SchoolService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
