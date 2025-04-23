import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ItemsPayloadDto } from '@/shared/dto/items.dto';
import { JobSeekersService } from '@/modules/job-seekers/job-seekers.service';
import { JobSeeker } from '@prisma/client';
import { JobSeekersDto } from '@/modules/job-seekers/dto/job-seekers.dto';

@Controller('job-seekers')
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersService) {}

  @Get()
  async getUsers(
    @Query() query: { limit: string; offset: string },
  ): Promise<ItemsPayloadDto<JobSeeker>> {
    return this.jobSeekersService.getJobSeekers({
      limit: query.limit,
      offset: query.offset,
    });
  }

  @Post()
  async createUser(@Body() payload: JobSeekersDto): Promise<JobSeeker> {
    return this.jobSeekersService.createJobSeeker(payload);
  }

  @Patch(':id')
  async updateUserId(
    @Param('id') id: string,
    @Body() payload: JobSeekersDto,
  ): Promise<JobSeeker> {
    return this.jobSeekersService.updateJobSeekerId({
      id: Number(id),
      ...payload,
    });
  }

  @Delete(':id')
  async deleteUserId(@Param('id') id: string): Promise<JobSeeker> {
    return this.jobSeekersService.deleteJobSeekerId(Number(id));
  }
}
