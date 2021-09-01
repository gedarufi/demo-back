import { Test, TestingModule } from '@nestjs/testing';
import { CourseListService } from './course-list.service';

describe('CourseListService', () => {
  let courseListSrv: CourseListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseListService],
    }).compile();

    courseListSrv = module.get<CourseListService>(CourseListService);
  });

  it('should be defined', () => {
    expect(courseListSrv).toBeDefined();
  });

  it('should be an array with elements', async () => {
    const courses = await courseListSrv.getAll();

    expect(courses.length).toBe(3);
  });
});
