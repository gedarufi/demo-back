import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { CourseEnrollmentController } from './course-enrollment.controller';

describe('CourseEnrollmentController', () => {
  let controller: CourseEnrollmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      controllers: [CourseEnrollmentController],
    }).compile();

    controller = module.get<CourseEnrollmentController>(
      CourseEnrollmentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list with the courses for the user', async () => {
    const courses = await controller.getCourse(326);

    expect(courses.length).toBe(2);
  });

  it('should return a empty list', async () => {
    const courses = await controller.getCourse(99);

    expect(courses.length).toBe(0);
  });
});
