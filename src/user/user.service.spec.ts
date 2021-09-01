import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let userSrv: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userSrv = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userSrv).toBeDefined();
  });

  it('should be a valid email', async () => {
    const user = await userSrv.findOneByEmail('juan@gcfglobal.org');

    expect(user).toBeDefined();
  });

  it('should be an invalid email', async () => {
    const user = await userSrv.findOneByEmail('gedarufi@inger.co');

    expect(user).toBeNull();
  });

  it('should be a valid email but an invalid email', async () => {
    const user = await userSrv.findOneByEmail('german.ruiz@inger.co');

    expect(user).toBeNull();
  });

  it('should be a valid password', async () => {
    const user = await userSrv.findOneByEmail('juan@gcfglobal.org');

    expect(await userSrv.ValidatePassword(user, '123456')).toBeTruthy();
  });

  it('should be an invalid password', async () => {
    expect(await userSrv.ValidatePassword(null, '123456')).toBeFalsy();
  });

  it('should be a list of courses', async () => {
    const user = await userSrv.findOneByEmail('juan@gcfglobal.org');
    const courses = await userSrv.findCourseEnrollmentByUserId(user.id);

    expect(courses.length).toBeGreaterThan(0);
  });

  it('should be an empty list of courses', async () => {
    expect((await userSrv.findCourseEnrollmentByUserId(-1)).length).toBe(0);
  });
});
