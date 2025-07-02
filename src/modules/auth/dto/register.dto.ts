import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserType } from '@prisma/client';

export class RegisterEmployerDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '@example', description: 'User telegram' })
  @IsString()
  telegram: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Yandex', description: 'Company name' })
  @IsString()
  name: string;

  @ApiProperty({
    enum: UserType,
    example: UserType.JOB_SEEKER,
    description: 'User type',
  })
  @IsEnum(UserType)
  type: UserType;
}

export class RegisterJobSeekerDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '@example', description: 'User telegram' })
  @IsString()
  telegram: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  lastName: string;

  @ApiProperty({
    enum: UserType,
    example: UserType.JOB_SEEKER,
    description: 'User type',
  })
  @IsEnum(UserType)
  type: UserType;
}
