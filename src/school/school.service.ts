import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async createSchool(data: Prisma.SchoolCreateInput) {
    const school = await this.prisma.school.create({ data });
    delete school.password;
    return { school, message: 'Successfully created!' };
  }

  async getAllSchools(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [{ email: { contains: search } }, { name: { contains: search } }],
        }
      : {};

    return this.prisma.school.findMany({
      skip,
      take: limit,
      where,
    });
  }

  async getSchoolById(id: number) {
    return this.prisma.school.findUnique({ where: { id } });
  }

  async updateSchool(id: number, data: Prisma.SchoolUpdateInput) {
    const school = await this.prisma.school.update({ where: { id }, data });
    delete school.password;
    return { school, message: 'Successfully updated!' };
  }

  async deleteSchool(id: number) {
    return this.prisma.school.delete({ where: { id } });
  }
}
