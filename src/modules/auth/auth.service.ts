import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { UserRole, UserType } from '@prisma/client';
import { UserResponse } from './types/user-response.type';
import { UsersService } from '../users/users.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

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
  ): Promise<UserResponse | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result as UserResponse;
    }
    return null;
  }

  async login(user: UserResponse) {
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

  async register(data: {
    email: string;
    telegram: string;
    password: string;
    firstName: string;
    lastName: string;
    type: UserType;
  }) {
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
        ...data,
        password: hashedPassword,
        role: UserRole.USER,
      },
    });
    const { password, ...result } = user;
    return this.login(result as UserResponse);
  }

  async refreshToken(req: Request, refreshToken: string) {
    const payload = await this.jwtRefreshStrategy.validate(req, {
      refreshToken,
    });
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.login(user as UserResponse);
  }
}
