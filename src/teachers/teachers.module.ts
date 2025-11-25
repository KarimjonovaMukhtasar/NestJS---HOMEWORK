import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service.js';
import { TeachersController } from './teachers.controller.js';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
