import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmployersDto {
  @IsNotEmpty()
  @IsString()
  surname: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  telegram: string;
  @IsNotEmpty()
  @IsString()
  type: 'employer' | 'job-seeker';
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  company: string;
}
