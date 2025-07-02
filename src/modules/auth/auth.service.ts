import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { UserRole } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  EmployerResponse,
  JobSeekerResponse,
} from '@/modules/auth/types/user-response.type';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly jwtRefreshStrategy: JwtRefreshStrategy,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<EmployerResponse | JobSeekerResponse | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result as EmployerResponse | JobSeekerResponse;
    }
    return null;
  }

  async login(user: EmployerResponse | JobSeekerResponse) {
    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload);
    const accessTokenExpiresIn = this.configService.get<string>(
      'JWT_ACCESS_EXPIRATION',
      '1h',
    );

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
    });
    const refreshTokenExpiresIn = this.configService.get<string>(
      'JWT_REFRESH_EXPIRATION',
      '7d',
    );

    await this.prisma.token.create({
      data: {
        refreshToken,
        userId: user.id,
        expiresAt: new Date(
          Date.now() + this.getExpirationTimeInMs(refreshTokenExpiresIn),
        ),
      },
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
      user,
    };
  }

  private getExpirationTimeInMs(expiration: string): number {
    const unit = expiration.slice(-1);
    const value = parseInt(expiration.slice(0, -1), 10);

    switch (unit) {
      case 's':
        return value * 1000;
      case 'm':
        return value * 60 * 1000;
      case 'h':
        return value * 60 * 60 * 1000;
      case 'd':
        return value * 24 * 60 * 60 * 1000;
      default:
        return 60 * 60 * 1000;
    }
  }

  // Employer

  async registerEmployer(data: EmployerResponse) {
    const existingUserEmail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUserEmail) {
      throw new ConflictException(
        'Пользователь с таким адресом электронной почты уже существует',
      );
    }

    const existingUserTelegram = await this.prisma.user.findUnique({
      where: { telegram: data.telegram },
    });

    if (existingUserTelegram) {
      throw new ConflictException(
        'Пользователь с этим telegram уже существует',
      );
    }

    const hashedPassword = await hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        telegram: data.telegram,
        password: hashedPassword,
        role: UserRole.USER,
        type: data.type,
        employer: {
          create: {
            name: data.name,
          },
        },
      },
    });
    const { password, ...result } = user;
    return this.login(result as EmployerResponse);
  }

  // JobSeeker

  async registerJobSeeker(data: JobSeekerResponse) {
    const existingUserEmail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUserEmail) {
      throw new ConflictException(
        'Пользователь с таким адресом электронной почты уже существует',
      );
    }

    const existingUserTelegram = await this.prisma.user.findUnique({
      where: { telegram: data.telegram },
    });

    if (existingUserTelegram) {
      throw new ConflictException(
        'Пользователь с этим telegram уже существует',
      );
    }

    const hashedPassword = await hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        telegram: data.telegram,
        password: hashedPassword,
        role: UserRole.USER,
        type: data.type,
        jobSeeker: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        },
      },
    });
    const { password, ...result } = user;
    return this.login(result as JobSeekerResponse);
  }

  async refreshToken(req: Request, refreshToken: string) {
    const payload = await this.jwtRefreshStrategy.validate(req, {
      refreshToken,
    });
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.login(user as EmployerResponse | JobSeekerResponse);
  }
}
