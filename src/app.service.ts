import { Injectable, NotFoundException } from '@nestjs/common';
import { Car, Prisma } from '@prisma/client';
import { prisma } from './prisma';

@Injectable()
export class AppService {
  async getList(): Promise<Car[]> {
    const cars = await prisma.car.findMany();
    return cars;
  }

  async create(car: Prisma.CarCreateInput): Promise<{ id: string }> {
    const { id } = await prisma.car.create({ data: car });
    return { id };
  }

  async update(
    car: Prisma.CarUpdateInput,
    params: { id: string },
  ): Promise<void> {
    if (!params.id) throw new NotFoundException();
    await prisma.car.update({
      data: car,
      where: {
        id: params.id,
      },
    });
  }

  async delete(params: { id: string }): Promise<void> {
    if (!params.id) throw new NotFoundException();
    await prisma.car.delete({ where: { id: params.id } });
  }

  async getOne(params: { id: string }): Promise<Car> {
    if (!params.id) throw new NotFoundException();
    return await prisma.car.findUnique({
      where: {
        id: params.id,
      },
    });
  }
}
