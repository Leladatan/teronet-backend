import { Module } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { AuthService } from '@/modules/auth/auth.service';
import { AuthController } from '@/modules/auth/auth.controller';
import { EmployersService } from '@/modules/employers/employers.service';
import { JobSeekersService } from '@/modules/job-seekers/job-seekers.service';

@Module({
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, EmployersService, JobSeekersService, PrismaService],
})
export class AuthModule {}
