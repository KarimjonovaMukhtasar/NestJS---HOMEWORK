import { Injectable } from '@nestjs/common';
// import { CreateStudentDto } from './dto/create-student.dto';
// import { UpdateStudentDto } from './dto/update-student.dto';
import fs from "fs/promises"
import path from "path"
import {v4 as uuid} from "uuid"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
@Injectable()
export class StudentsService {
  private filePath = path.join(process.cwd(), 'src/students/students.json');
  async create(payload: {username: string, email: string, password: string, age: number}) {
    try{
    const fileData = await fs.readFile(this.filePath, 'utf-8')
    const students = fileData ? JSON.parse(fileData) : []
    const newUser = {...payload, id: uuid()}
    students.push(newUser)
    await fs.writeFile(this.filePath, JSON.stringify(students, null, 2), 'utf-8' )
    return {
      success: true,
      message: 'ADDED A NEW USER SUCCESSFULLY!',
      data: newUser
    }
    }catch(err){
      throw new Error(`ERROR WHILE WRITING TO A FILE!  ${(err as Error).message}`)
    }
  }

  async findAll() { 
  }

  async findOne(id: string) {
    return {

    };
  }

  async update(id: string, ) {
    return `This action updates a #${id} student`;
  }

  async remove(id: string) {
    return `This action removes a #${id} student`;
  }
}
