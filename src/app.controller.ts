import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Configuration } from './config';

const NODE_ENV = process.env.NODE_ENV || 'development';

@Controller(Configuration[NODE_ENV].endPoint)
export class AppController {
  constructor(private readonly authSrv: AuthService) {}

  @Post('login')
  login(@Body() body) {
    return this.authSrv.signIn(body);
  }
}
