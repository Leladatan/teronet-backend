import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JobSeekersDto {
  @IsNotEmpty()
  @IsString()
  surname: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  patronymic: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  telegram: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
