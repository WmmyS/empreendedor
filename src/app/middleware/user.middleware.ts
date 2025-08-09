import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserTokenService } from '../services/userToken/userToken.service';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/infra/configurations/configuration';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly userTokenService: UserTokenService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      console.log('Authorization header is missing');
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('Token is missing');
      throw new UnauthorizedException('Token is missing');
    }

    try {

      const userToken = await this.userTokenService.findByToken(token);
      if (!userToken) {
        console.log('Token not found in database');
        throw new UnauthorizedException('Invalid token');
      }

      await this.jwtService.verify(token, { secret: configuration().jwt.secret });
      req['user'] = userToken.user;

      next();
    } catch (error) {
      if (error.message.includes('jwt expired')) {
        console.log('Token expired, removing from database');
        await this.userTokenService.remove(token);
      }
      throw new UnauthorizedException('Error validating token');
    }
  }
}
