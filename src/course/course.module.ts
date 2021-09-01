import { Module } from '@nestjs/common';
import { CourseListController } from './course-list/course-list.controller';
import { CourseListService } from './course-list/course-list.service';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';

@Module({
  controllers: [CourseListController, CourseController],
  providers: [CourseListService, CourseService],
})
export class CourseModule {}
