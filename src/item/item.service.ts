import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async createItem(data: Prisma.ItemCreateInput) {
    return this.prisma.item.create({ data });
  }

  async getAllItems(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search } }, // Search in the `item` enum
            { donor: { name: { contains: search } } }, // Search in the `Donor` name
            { school: { name: { contains: search } } }, // Search in the `School` name
          ],
        }
      : {};

    return this.prisma.item.findMany({
      skip,
      take: limit,
      where,
      include: {
        donor: true,
        school: true,
      },
    });
  }

  async getItemById(id: number) {
    return this.prisma.item.findUnique({
      where: { id },
      include: {
        donor: true,
        school: true,
      },
    });
  }

  async updateItem(id: number, data: Prisma.ItemUpdateInput) {
    return this.prisma.item.update({
      where: { id },
      data,
    });
  }

  async deleteItem(id: number) {
    return this.prisma.item.delete({ where: { id } });
  }
}
