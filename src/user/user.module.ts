import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CourseEnrollmentController } from './course-enrollment/course-enrollment.controller';

@Module({
  providers: [UserService],
  exports: [UserService],
  controllers: [CourseEnrollmentController],
})
export class UserModule {}
