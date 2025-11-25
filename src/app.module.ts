import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { StudentsModule } from './students/students.module.js';

@Module({
  imports: [StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
