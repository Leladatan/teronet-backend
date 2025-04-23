import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JobSeeker } from '@prisma/client';
import { defaultTake } from '@/shared/utils/default-take';
import { ItemsPayloadDto } from '@/shared/dto/items.dto';
import { JobSeekersDto } from '@/modules/job-seekers/dto/job-seekers.dto';

@Injectable()
export class JobSeekersService {
  constructor(private prismaService: PrismaService) {}

  async getJobSeekers({
    limit,
    offset,
  }: {
    limit: string;
    offset: string;
  }): Promise<ItemsPayloadDto<JobSeeker>> {
    return this.getJobSeekersItemsPayloadDto({
      limit: +limit,
      offset: +offset,
    });
  }

  async createJobSeeker(payload: JobSeekersDto): Promise<JobSeeker> {
    await this.isExistJobSeekerData({
      email: payload.email,
    });
    return this.prismaService.jobSeeker.create({
      data: {
        ...payload,
      },
    });
  }

  async updateJobSeekerId({
    id,
    ...payload
  }: JobSeekersDto & { id: number }): Promise<JobSeeker> {
    await this.findJobSeekerById(id);
    return this.prismaService.jobSeeker.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }

  async deleteJobSeekerId(id: number): Promise<JobSeeker> {
    await this.findJobSeekerById(id);

    return this.prismaService.jobSeeker.delete({
      where: {
        id,
      },
    });
  }

  //   Вспомогательные функции

  async findJobSeekerById(id: number): Promise<JobSeeker> {
    const jobSeeker: JobSeeker | null =
      await this.prismaService.jobSeeker.findUnique({
        where: {
          id,
        },
      });

    if (!jobSeeker) throw new NotFoundException('Соискатель не найден');

    return jobSeeker;
  }

  async getJobSeekersItemsPayloadDto({
    limit = 0,
    offset = 100,
  }: {
    limit: number;
    offset: number;
  }): Promise<ItemsPayloadDto<JobSeeker>> {
    const isTake: boolean = isNaN(limit);
    const isSkip: boolean = isNaN(offset);

    const [items, total] = await this.prismaService.$transaction([
      this.prismaService.jobSeeker.findMany({
        take: !isTake ? limit : defaultTake,
        skip: !isSkip ? offset : 0,
        orderBy: {
          id: 'asc',
        },
      }),
      this.prismaService.jobSeeker.count(),
    ]);

    return {
      items,
      total,
    };
  }

  async isExistJobSeekerData({ email }: { email: string }): Promise<void> {
    const isExistEmail: JobSeeker | null =
      await this.prismaService.jobSeeker.findUnique({
        where: {
          email,
        },
      });

    if (isExistEmail)
      throw new BadRequestException('Поле "Email" уже используется');
  }
}
