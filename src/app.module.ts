import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { DonorModule } from './donor/donor.module';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SchoolModule, DonorModule, ItemModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
