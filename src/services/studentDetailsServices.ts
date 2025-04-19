  
  import StudentModel from '../models/studentModel.js';
  import { IStudent } from '../models/studentModel.js';
  import {IMark} from '../models/studentModel.js'
  
  
  export const getStudentDataService = async (enrollmentId: string): Promise<IStudent| null> => {
    try {
      const student = await StudentModel.findOne({ enrollmentId });
      return student;
    } catch (error) {
      throw new Error("Error retrieving student data");
    }
  };