import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import {
  RegisterEmployerDto,
  RegisterJobSeekerDto,
} from '@/modules/auth/dto/register.dto';
import { Employer, JobSeeker } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() payload: RegisterEmployerDto | RegisterJobSeekerDto,
  ): Promise<Employer | JobSeeker> {
    console.log(payload);
    return await this.authService.register(payload);
  }
}
