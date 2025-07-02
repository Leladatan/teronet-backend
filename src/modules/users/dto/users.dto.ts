import { UserType } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class EmployerDto {
  @IsEmail({}, { message: 'Email должен быть валидным адресом' })
  email!: string;

  @IsString({ message: 'Telegram должен быть строкой' })
  @IsNotEmpty({ message: 'Telegram обязателен' })
  telegram!: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(6, 128, {
    message: 'Пароль должен содержать от 6 до 128 символов',
  })
  password!: string;

  @IsString({ message: 'Название компании должно быть строкой' })
  @IsNotEmpty({ message: 'название компании обязательно' })
  name!: string;

  @IsEnum(UserType, { message: 'Тип пользователя указан неверно' })
  type!: UserType;
}

export class JobSeekerDto {
  @IsEmail({}, { message: 'Email должен быть валидным адресом' })
  email!: string;

  @IsString({ message: 'Telegram должен быть строкой' })
  @IsNotEmpty({ message: 'Telegram обязателен' })
  telegram!: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(6, 128, {
    message: 'Пароль должен содержать от 6 до 128 символов',
  })
  password!: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно' })
  firstName!: string;

  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия обязательна' })
  lastName!: string;

  @IsEnum(UserType, { message: 'Тип пользователя указан неверно' })
  type!: UserType;
}
