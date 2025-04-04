import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DonorService {
  constructor(private prisma: PrismaService) {}

  async createDonor(data: Prisma.DonorCreateInput) {
    return this.prisma.donor.create({ data });
  }

  async getAllDonors(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { document: { contains: search } },
            { email: { contains: search } },
            { name: { contains: search } },
          ],
        }
      : {};

    return this.prisma.donor.findMany({
      skip,
      take: limit,
      where,
    });
  }

  async getDonorById(id: number) {
    return this.prisma.donor.findUnique({ where: { id } });
  }

  async updateDonor(id: number, data: Prisma.DonorUpdateInput) {
    return this.prisma.donor.update({ where: { id }, data });
  }

  async deleteDonor(id: number) {
    return this.prisma.donor.delete({ where: { id } });
  }
}
