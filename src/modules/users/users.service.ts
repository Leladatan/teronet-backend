import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserType } from '@prisma/client';
import {ItemsDto} from "@/shared/dto/items.dto";
import {EmployerDto, JobSeekerDto} from "@/modules/users/dto/users.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ItemsDto<User>> {
    const [items, total] = await Promise.all([
      this.prisma.user.findMany(),
      this.prisma.user.count(),
    ]);
    return { items, total };
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findByType(type: UserType): Promise<ItemsDto<User>> {
    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where: { type },
      }),
      this.prisma.user.count({
        where: { type },
      }),
    ]);
    return { items, total };
  }

  async remove(id: string): Promise<User> {
    await this.findById(id);
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Employer

  async createEmployer(data: EmployerDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateEmployer(id: string, data: EmployerDto): Promise<User> {
    await this.findById(id);
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // JobSeeker

  async createJobSeeker(data: JobSeekerDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateJobSeeker(id: string, data: JobSeekerDto): Promise<User> {
    await this.findById(id);
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

}
