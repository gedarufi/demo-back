import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { readFile as readFileCallback } from 'fs';
import { join } from 'path';

const readFile = promisify(readFileCallback);

@Injectable()
export class CourseListService {
  async getAll() {
    const coursesContent = await readFile(
      join(__dirname, '../../../data/courses.json'),
      'utf-8',
    );

    const coursesInfo = JSON.parse(coursesContent);

    return coursesInfo.courses;
  }
}
