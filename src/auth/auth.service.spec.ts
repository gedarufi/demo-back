import { UserModule } from './../user/user.module';
import { Configuration } from './../config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

process.env.NODE_ENV = 'test';

const NODE_ENV = process.env.NODE_ENV || 'test';

describe('AuthService', () => {
  let authSrv: AuthService;

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

    authSrv = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authSrv).toBeDefined();
  });

  it('should be a valid user', async () => {
    const user = await authSrv.validateUser({ email: 'juan@gcfglobal.org' });

    expect(user).toBeDefined();
  });

  it('should be an invalid user', async () => {
    const user = await authSrv.validateUser({ email: 'gedarufi@inger.co' });

    expect(user).toBeNull();
  });

  it('should be a valid token', async () => {
    const resp = await authSrv.signIn({
      email: 'juan@gcfglobal.org',
      password: '123456',
    });

    expect(resp.token).toBeDefined();
  });

  it('should be an invalid token', async () => {
    await expect(
      authSrv.signIn({
        email: 'gedarufi@inger.co',
        password: '123456',
      }),
    ).rejects.toThrowError(UnauthorizedException);
  });
});
