import { UserModule } from './../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { Configuration } from './../config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ExecutionContext } from '@nestjs/common';

process.env.NODE_ENV = 'test';

const NODE_ENV = process.env.NODE_ENV || 'test';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: Configuration[NODE_ENV].secretOrPrivateKey,
        }),
        UserModule,
      ],
      providers: [AuthService, JwtStrategy, AuthGuard],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it('should be a logued user', async () => {
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzI2LCJlbWFpbCI6Imp1YW5AZ2NmZ2xvYmFsLm9yZyIsImZ1bGxOYW1lIjoiSnVhbiBQw6lyZXoiLCJpYXQiOjE2MzAzNDU2MzAzMzUsImV4cCI6MTYzMDM2MDAzMDMzNX0.B0pOAeCRI2ANNSPBRclocGcqTBsW6EDv7wmsMFwVU84';
    const ctxMock = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${jwtToken}`,
          },
        }),
      }),
    };

    expect(await authGuard.canActivate(ctxMock as ExecutionContext)).toBe(true);
  });

  it('should be an anonymous user', async () => {
    const ctxMock = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: '',
          },
        }),
      }),
    };

    expect(await authGuard.canActivate(ctxMock as ExecutionContext)).toBe(
      false,
    );
  });
});
