import { Configuration } from './../../config';
import { Controller, Get, Param } from '@nestjs/common';
import { Course } from '../course.entity';
import { CourseService } from './course.service';

const NODE_ENV = process.env.NODE_ENV || 'development';

@Controller(`${Configuration[NODE_ENV].endPoint}/courses`)
export class CourseController {
  constructor(private readonly courseSrv: CourseService) {}

  @Get(':id')
  getAll(@Param('id') id: string) {
    return this.courseSrv.getOne(id);
  }
}
