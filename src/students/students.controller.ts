import {  Controller,   Get,   Post,  Body,  Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service.js';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() payload: {username: string, email: string, password: string, age: number}) {
    return this.studentsService.create(payload);
  }

  @Get('all')
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch()
  update(@Body() data: {id: string, email?: string, username?:string, password?:string, age?:number}) {
    return this.studentsService.update(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
