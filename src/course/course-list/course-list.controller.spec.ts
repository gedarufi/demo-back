import { Test, TestingModule } from '@nestjs/testing';
import { CourseListController } from './course-list.controller';
import { CourseListService } from './course-list.service';

describe('CourseListController', () => {
  let controller: CourseListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseListService],
      controllers: [CourseListController],
    }).compile();

    controller = module.get<CourseListController>(CourseListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list with all the courses', async () => {
    const courses = await controller.getAll();

    expect(courses.length).toBe(3);
  });
});
