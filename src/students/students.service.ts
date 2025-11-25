import { Injectable, NotFoundException } from '@nestjs/common';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()

export class StudentsService {
  private filePath = path.join(process.cwd(), 'src/students/students.json');
  async create(payload: {
    username: string;
    email: string;
    password: string;
    age: number;
  }) {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      const students = fileData ? JSON.parse(fileData) : [];
      const newUser = { ...payload, id: uuid() };
      students.push(newUser);
      await fs.writeFile(
        this.filePath,
        JSON.stringify(students, null, 2),
        'utf-8',
      );
      return {
        success: true,
        message: 'ADDED A NEW USER SUCCESSFULLY!',
        data: newUser,
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
      const students = fileData ? JSON.parse(fileData) : [];
      return {
        success: true,
        message: `SUCCESSFULLY RETRIEVED ALL DATA`,
        data: students,
      };
    } catch (err) {
      throw new Error(`ERROR WHILE READING A FILE!  ${(err as Error).message}`);
    }
  }

  async findOne(id: string) {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      const students = JSON.parse(fileData);
      const studentIndex = students.findIndex((el) => el.id === id);
      if (studentIndex === -1) {
        return {
          success: false,
          message: 'Student not found',
        };
      }
      return {
        success: true,
        message: `SUCCESSFULLY RETRIEVED ONE STUDENT FROM DATABASE`,
        data: students[studentIndex],
      };
    } catch (err) {
      throw new Error(
        `ERROR WHILE FINDING A STUDENT! ${(err as Error).message}`,
      );
    }
  }

  async update(data: {id: string, email?: string, username?:string, password?:string, age?:number}) {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      const students = JSON.parse(fileData);
      const studentIndex = students.findIndex((el) => el.id === data.id);
      if (studentIndex === -1) {
        return {
          success: false,
          message: 'Student not found',
        };
      }
     students[studentIndex]  = {...students[studentIndex], ...data}
      await fs.writeFile(
        this.filePath,
        JSON.stringify(students, null, 2),
        'utf-8',
      );
      return {
        success: true,
        message: `SUCCESSFULLY UPDATED ONE STUDENT`,
        data: students[studentIndex],
      };
    } catch (err) {
      throw new Error(
        `ERROR WHILE UPDATING A STUDENT ${(err as Error).message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const fileData = await fs.readFile(this.filePath, 'utf-8');
      const students = JSON.parse(fileData);
      const studentIndex = students.findIndex((el) => el.id === id);
      if (studentIndex === -1) {
        return {
          success: false,
          message: 'Student not found',
        };
      }
      students.splice(studentIndex, 1)
      await fs.writeFile(
        this.filePath,
        JSON.stringify(students, null, 2),
        'utf-8',
      );
      return {
        success: true,
        message: `SUCCESSFULLY DELETED ONE STUDENT FROM DATABASE`
      };
    } catch (err) {
      throw new Error(
        `ERROR WHILE FINDING A STUDENT! ${(err as Error).message}`,
      );
    }
  }
}
