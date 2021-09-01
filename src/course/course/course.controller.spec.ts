import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

describe('CourseController', () => {
  let controller: CourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [CourseService],
    }).compile();

    controller = module.get<CourseController>(CourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a valid course', async () => {
    expect(await controller.getAll('A1')).toBeDefined();
  });

  it('should return a not found exception when the course does not exist', async () => {
    await expect(controller.getAll('A9')).rejects.toThrowError(
      NotFoundException,
    );
  });
});
