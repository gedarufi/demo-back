import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';

import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

import { Configuration } from '../config';

const NODE_ENV = process.env.NODE_ENV || 'development';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  async signIn(model: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const user = await this.validateUser({ email: model.email });

    if (!user) {
      throw new UnauthorizedException();
    }

    const validate = await this.usersService.ValidatePassword(
      user,
      model.password,
    );

    if (!validate) {
      throw new UnauthorizedException();
    }

    const nowTime = new Date().getTime();

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      iat: nowTime,
      exp: nowTime + Configuration[NODE_ENV].expireIn,
    };

    return { token: this.jwtService.sign(payload) };
  }

  async validateUser(payload: Partial<JwtPayload>): Promise<User> {
    return await this.usersService.findOneByEmail(payload.email);
  }
}
