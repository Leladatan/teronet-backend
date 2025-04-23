import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import {
  RegisterEmployerDto,
  RegisterJobSeekerDto,
} from '@/modules/auth/dto/register.dto';
import { EmployersService } from '@/modules/employers/employers.service';
import { JobSeekersService } from '@/modules/job-seekers/job-seekers.service';
import { Employer, JobSeeker } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private employersService: EmployersService,
    private jobSeekersService: JobSeekersService,
  ) {}

  async register(
    dto: RegisterEmployerDto | RegisterJobSeekerDto,
  ): Promise<Employer | JobSeeker> {
    const { type } = dto;

    if (type === 'employer') {
      return await this.employersService.createEmployer(
        dto as RegisterEmployerDto,
      );
    }

    if (type === 'job-seeker') {
      return await this.jobSeekersService.createJobSeeker(
        dto as RegisterJobSeekerDto,
      );
    }
  }
}
