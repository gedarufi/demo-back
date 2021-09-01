import { Injectable, NotFoundException } from '@nestjs/common';
import { promisify } from 'util';
import { exists as existsCallback, readFile as readFileCallback } from 'fs';
import { join } from 'path';
import { Course, Page } from '../course.entity';

const readFile = promisify(readFileCallback);
const exists = promisify(existsCallback);

@Injectable()
export class CourseService {
  async getOne(id: string) {
    const coursesContent = await readFile(
      join(__dirname, '../../../data/courses.json'),
      'utf-8',
    );
    const pagesContent = await readFile(
      join(__dirname, '../../../data/pages.json'),
      'utf-8',
    );

    const coursesInfo = JSON.parse(coursesContent);
    const pagesInfo = JSON.parse(pagesContent);

    const course = coursesInfo.courses.find((c: Course) => c.id === id);

    if (!course) {
      throw new NotFoundException();
    }

    const pages = pagesInfo.pages.filter((p: Page) => course.id === p.course);

    for (const page of pages) {
      try {
        const contentPath = join(__dirname, '../../../content', page.content);
        const hasContent = await exists(contentPath);

        if (hasContent) {
          page.content = await readFile(contentPath, 'utf-8');
        }
      } catch (error) {
        //The file doesn't exist
      }
    }

    return {
      ...course,
      pages: pages,
    };
  }
}
