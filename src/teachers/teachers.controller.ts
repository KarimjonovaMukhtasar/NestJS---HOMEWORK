import {  Controller,   Get,   Post,  Body,  Patch, Param, Delete } from '@nestjs/common';
import { TeachersService } from './teachers.service.js';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  create(@Body() payload: {fullname: string, email: string, password: string, department: string, experience: string}) {
    return this.teachersService.create(payload);
  }

  @Get('all')
  findAll() {
    return this.teachersService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch()
  update(@Body() data: {id: string, fullname?: string, email?: string, password?: string, department?: string, experience?: string}) {
    return this.teachersService.update(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
