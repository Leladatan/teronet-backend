import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err: any, user: any, info: any, context: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }

  getRequest(context: any) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.refresh_token;

    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    
    return request;
  }
} 