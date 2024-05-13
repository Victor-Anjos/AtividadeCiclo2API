import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Car, Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getCars(): Promise<Car[]> {
    return await this.appService.getList();
  }

  @Post('/')
  async createCar(@Body() car: Prisma.CarCreateInput): Promise<{ id: string }> {
    return await this.appService.create(car);
  }

  @Put('/:id')
  async updateCar(
    @Body() car: Prisma.CarUpdateInput,
    @Param() params: { id: string },
  ): Promise<void> {
    await this.appService.update(car, params);
  }

  @Delete('/:id')
  async deleteCar(@Param() params: { id: string }) {
    await this.appService.delete(params);
  }

  @Get('/:id')
  async getOneCar(@Param() params: { id: string }) {
    return await this.appService.getOne(params);
  }
}
