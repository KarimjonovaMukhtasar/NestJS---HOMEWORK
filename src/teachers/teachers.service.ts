import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TeachersService {
  private filePath = path.join(process.cwd(), 'src/teachers/teachers.json');
  async create(payload: {
    fullname: string;
    email: string;
    password: string;
    department: string;
    experience: string;
  }) {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      const teachers = fileData ? JSON.parse(fileData) : [];
      const newTeacher = { ...payload, id: uuid() };
      teachers.push(newTeacher);
      await fs.writeFile(
        this.filePath,
        JSON.stringify(teachers, null, 2),
        'utf-8',
      );
      return {
        success: true,
        message: 'ADDED A NEW TEACHER SUCCESSFULLY!',
        data: newTeacher,
      };
    } catch (err) {
      throw new Error(
        `ERROR WHILE WRITING TO A FILE!  ${(err as Error).message}`,
      );
    }
  }

  async findAll() {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      const teachers = fileData ? JSON.parse(fileData) : [];
      return {
        success: true,
        message: `SUCCESSFULLY RETRIEVED ALL DATA`,
        data: teachers,
      };
    } catch (err) {
      throw new Error(`ERROR WHILE READING A FILE!  ${(err as Error).message}`);
    }
  }

  async findOne(id: string) {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      const teachers = JSON.parse(fileData);
      const teacherIndex = teachers.findIndex((el) => el.id === id);
      if (teacherIndex === -1) {
        return {
          success: false,
          message: 'Teacher not found',
        };
      }
      return {
        success: true,
        message: `SUCCESSFULLY RETRIEVED ONE TEACHER FROM DATABASE`,
        data: teachers[teacherIndex],
      };
    } catch (err) {
      throw new Error(
        `ERROR WHILE FINDING A TEACHER! ${(err as Error).message}`,
      );
    }
  }

  async update(data: {id: string, fullname?: string, email?: string, password?: string, department?: string, experience?: string} ) {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      const teachers = JSON.parse(fileData);
      const teacherIndex = teachers.findIndex((el) => el.id === data.id);
      if (teacherIndex === -1) {
        return {
          success: false,
          message: 'Teacher not found',
        };
      }
      teachers[teacherIndex] = { ...teachers[teacherIndex], ...data };
      await fs.writeFile(
        this.filePath,
        JSON.stringify(teachers, null, 2),
        'utf-8',
      );
      return {
        success: true,
        message: `SUCCESSFULLY UPDATED ONE TEACHER`,
        data: teacherIndex[teacherIndex],
      };
    } catch (err) {
      throw new Error(
        `ERROR WHILE UPDATING A TEACHER ${(err as Error).message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      const teachers = JSON.parse(fileData);
      const teacherIndex = teachers.findIndex((el) => el.id === id);
      if (teacherIndex === -1) {
        return {
          success: false,
          message: 'Teacher not found',
        };
      }
      teachers.splice(teacherIndex, 1);
      await fs.writeFile(
        this.filePath,
        JSON.stringify(teachers, null, 2),
        'utf-8',
      );
      return {
        success: true,
        message: `SUCCESSFULLY DELETED ONE TEACHER FROM DATABASE`,
      };
    } catch (err) {
      throw new Error(
        `ERROR WHILE FINDING A TEACHER! ${(err as Error).message}`,
      );
    }
  }
}
