import { Module } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JobSeekersService } from '@/modules/job-seekers/job-seekers.service';
import { JobSeekersController } from '@/modules/job-seekers/job-seekers.controller';

@Module({
  exports: [JobSeekersService],
  controllers: [JobSeekersController],
  providers: [JobSeekersService, PrismaService],
})
export class JobSeekersModule {}
