import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { EmployersModule } from '@/modules/employers/employers.module';
import { JobSeekersModule } from '@/modules/job-seekers/job-seekers.module';

@Module({
  imports: [JobSeekersModule, EmployersModule, AuthModule],
})
export class AppModule {}
