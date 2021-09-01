import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth.guard';
import { Configuration } from '../config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

const NODE_ENV = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Configuration[NODE_ENV].secretOrPrivateKey,
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, AuthGuard],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
