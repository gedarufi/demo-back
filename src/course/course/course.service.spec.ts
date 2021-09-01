import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let courseSrv: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    courseSrv = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(courseSrv).toBeDefined();
  });

  it('should be defined and with content', async () => {
    expect(await courseSrv.getOne('A1')).toBeDefined();
  });
});
