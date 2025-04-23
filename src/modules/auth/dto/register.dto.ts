import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterEmployerDto {
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
  company: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterJobSeekerDto {
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
  skills: string[];
}
