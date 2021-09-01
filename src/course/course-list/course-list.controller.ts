import { Configuration } from './../../config';
import { Controller, Get } from '@nestjs/common';
import { CourseListService } from './course-list.service';

const NODE_ENV = process.env.NODE_ENV || 'development';

@Controller(`${Configuration[NODE_ENV].endPoint}/courses`)
export class CourseListController {
  constructor(private readonly courseListSrv: CourseListService) {}

  @Get('')
  getAll() {
    return this.courseListSrv.getAll();
  }
}
