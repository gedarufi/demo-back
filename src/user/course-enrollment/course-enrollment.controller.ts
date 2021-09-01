import { Configuration } from './../../config';
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../user.service';

const NODE_ENV = process.env.NODE_ENV || 'development';

@Controller(`${Configuration[NODE_ENV].endPoint}/users`)
export class CourseEnrollmentController {
  constructor(private readonly usersSrv: UserService) {}

  @Get(':userId/courses')
  getCourse(@Param('userId') id) {
    return this.usersSrv.findCourseEnrollmentByUserId(Number(id));
  }
}
