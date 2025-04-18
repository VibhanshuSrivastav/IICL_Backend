import StudentModel from '../models/studentModel.js';
import { IStudent } from '../models/studentModel.js';
import {IMark} from '../models/studentModel.js'

export const setStudentDataService = async (studentData: any) => {
    try {
      console.log("Student data received:", studentData);
      const student = new StudentModel(studentData);
      await student.save();
      return student;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error saving student data: ${error.message}`);
      } else {
        throw new Error('Error saving student data');
      }
    }
  };
  export const getStudentListDataService = async (franchiseId: string): Promise<IStudent[]> => {
    try {
      const students = await StudentModel.find({ franchiseId });
      return students;
    } catch (error) {
      throw new Error("Error retrieving student data");
    }
  };

  export const getAllStudentListDataService = async (): Promise<IStudent[]> => {
    try {
      const students = await StudentModel.find({});
      return students;
    } catch (error) {
      throw new Error("Error retrieving all student data");
    }
  };



  export const editStudentDataByEnrollmentId = async (
    enrollmentId: string,
    updatedData: Partial<IStudent>
  ): Promise<IStudent | null> => {
    try {
      console.log("Attempting to update student with enrollmentId:", enrollmentId);
      console.log("Updated data:", updatedData);
      
      const updatedStudent = await StudentModel.findOneAndUpdate(
        { enrollmentId }, // Query condition
        updatedData,      // Data to update
        { new: true, runValidators: true } // Return the updated document and run validations
      );
      
      console.log("Updated student:", updatedStudent);
      return updatedStudent;
    } catch (error) {
      console.error("Error in editStudentDataByEnrollmentId:", error);
      throw new Error("Error updating student data");
    }
  };

    export const getAllStudentsService = async (): Promise<IStudent[]> => {
        try {
            const students = await StudentModel.find();
            return students;
        } catch (error) {
            throw new Error("Error retrieving all students");
        }
    };
  

    export const addStudentMarks = async (enrollmentId: string, marksData: any) => {
      try {
        // Find student by enrollmentId
        const student = await StudentModel.findOne({ enrollmentId });
    
        if (!student) {
          return { status: false, message: "Student not found" };
        }
    
        // Add marks to the existing array
        student.marks.push(...marksData);
        await student.save();
    
        return { status: true, message: "Marks added successfully", data: student };
      } catch (error) {
        console.error("Service Error - addStudentMarks:", error);
        return { status: false, message: "Error adding marks" };
      }
    };
    

    export const getStudentMarksByEnrollmentIdService = async (enrollmentId: string): Promise<IMark[]> => {
      try {
        // Use projection to return only the "marks" field
        const student: Pick<IStudent, "marks"> | null = await StudentModel.findOne(
          { enrollmentId },
          { marks: 1, _id: 0 }
        );
        
        if (!student) {
          throw new Error("Student not found");
        }
        
        return student.marks;
      } catch (error) {
        throw new Error(`Error fetching marks: ${error}`);
      }
    };

    export const editStudentMarksByEnrollmentIdService = async (
      enrollmentId: string,
      updatedMarkData: any
    ): Promise<any> => {
      try {
        // Find the student document that has a mark with the matching subject.
        // Using "marks.subject": updatedMarkData.subject will match the array element.
        const updatedStudent = await StudentModel.findOneAndUpdate(
          { enrollmentId, "marks.subject": updatedMarkData.subject },
          {
            // The positional operator "$" targets the first element that matches the condition.
            $set: {
              "marks.$": updatedMarkData,
            },
          },
          { new: true, runValidators: true }
        );
    
        if (!updatedStudent) {
          throw new Error("Student or mark not found");
        }
    
        // Find and return the updated mark from the updated document.
        const updatedMark = updatedStudent.marks.find(
          (mark: any) =>
            mark.subject.toLowerCase() === updatedMarkData.subject.toLowerCase()
        );
        return updatedMark;
      } catch (error: any) {
        throw new Error(`Error updating student mark: ${error.message}`);
      }
    };
    
    
    export const deleteStudentMarksByEnrollmentIdService = async (
      enrollmentId: string,
      subject: string
    ): Promise<any> => {
      try {
        // Use $pull to remove any marks whose subject matches (case-insensitive).
        const updatedStudent = await StudentModel.findOneAndUpdate(
          { enrollmentId },
          {
            $pull: {
              marks: { subject: { $regex: new RegExp(`^${subject}$`, "i") } },
            },
          },
          { new: true }
        );
    
        if (!updatedStudent) {
          throw new Error("Student not found");
        }
    
        return updatedStudent;
      } catch (error: any) {
        throw new Error(`Error deleting student mark: ${error.message}`);
      }
    };

    export const deleteStudentService = async (studentId: string) => {
      try {
        const deletedStudent = await StudentModel.findByIdAndDelete(studentId);
        return deletedStudent; // Returns the deleted document or null if not found
      } catch (error: any) {
        console.error("Error in deleteStudentService:", error);
        throw new Error(`Error deleting student: ${error.message}`);
      }
    };
    