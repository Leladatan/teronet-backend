import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserType } from '@prisma/client';
import {UsersDto} from "@/modules/users/dto/users.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
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

  async findByType(type: UserType): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { type },
    });
  }

  async create(data: UsersDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(
    id: string,
    data: UsersDto,
  ): Promise<User> {
    await this.findById(id);
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<User> {
    await this.findById(id);
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
