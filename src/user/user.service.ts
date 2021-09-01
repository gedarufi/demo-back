import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { promisify } from 'util';
import { readFile as readFileCallback } from 'fs';
import { join } from 'path';

const readFile = promisify(readFileCallback);

@Injectable()
export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async findOneByEmail(email: string): Promise<User> {
    const loginContent = await readFile(
      join(__dirname, '../../data/login.json'),
      'utf-8',
    );
    const usersContent = await readFile(
      join(__dirname, '../../data/users.json'),
      'utf-8',
    );

    const loginInfo = JSON.parse(loginContent);
    const usersInfo = JSON.parse(usersContent);

    const lUser = loginInfo.users.find((usr) => usr.email === email);

    if (!lUser) {
      return null;
    }

    const uUser = usersInfo.users.find((usr) => usr.id === lUser.id);

    if (!uUser) {
      return null;
    }

    const user: User = new User({ ...lUser, ...uUser });

    return user;
  }

  ValidatePassword(user: User, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve) =>
      resolve(!!user ? user.password === password : false),
    );
  }

  async findCourseEnrollmentByUserId(id: number) {
    const enrollmentsContent = await readFile(
      join(__dirname, '../../data/enrollments.json'),
      'utf-8',
    );
    const coursesContent = await readFile(
      join(__dirname, '../../data/courses.json'),
      'utf-8',
    );

    const enrollmentsInfo = JSON.parse(enrollmentsContent);
    const coursesInfo = JSON.parse(coursesContent);

    return enrollmentsInfo.enrollments
      .filter((enr) => enr.user === id)
      .map((enr) => ({
        status: enr.status,
        course: coursesInfo.courses.find((course) => enr.course === course.id),
      }));
  }
}
