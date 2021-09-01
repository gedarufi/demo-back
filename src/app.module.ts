import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CourseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
