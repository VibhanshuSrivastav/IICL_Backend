  
  import StudentModel from '../models/studentModel.js';
  import { IStudent } from '../models/studentModel.js';
  import {IMark} from '../models/studentModel.js';
  import FranchiseAdmissionModel from '../models/FranchiseAdmissionData.js';
  
  
  export const getStudentDataService = async (enrollmentId: string): Promise<IStudent| null> => {
    try {
      const student = await StudentModel.findOne({ enrollmentId });
      return student;
    } catch (error) {
      throw new Error("Error retrieving student data");
    }
  };

  export const getStudentDataWithFranchiseAndCenterService = async (enrollmentId: string): Promise<any> => {
    try {
      const student = await StudentModel.findOne({ enrollmentId }).lean();
      
      if (!student) {
        return null;
      }

      let franchiseName = 'N/A';
      let centerName = 'N/A';

      // Get franchise information using franchiseId
      // Handle both string and number franchiseId
      if (student.franchiseId) {
        // Convert student's franchiseId (string) to number for matching
        const franchiseIdNum = Number(student.franchiseId);
        
        // Only query if we have a valid number
        if (!isNaN(franchiseIdNum)) {
          // Find franchise by franchiseId (stored as number in franchise model)
          const franchise = await FranchiseAdmissionModel.findOne({
            franchiseId: franchiseIdNum
          }).select('franchiseId instituteName centerId').lean();

          if (franchise) {
            franchiseName = franchise.instituteName || 'N/A';
            
            // Get center information using centerId from franchise
            if (franchise.centerId) {
              const center = await FranchiseAdmissionModel.findOne({
                centerId: franchise.centerId
              }).select('instituteName').lean();
              
              if (center) {
                centerName = center.instituteName || 'N/A';
              }
            }
          }
        }
      }

      return {
        ...student,
        franchiseName,
        centerName
      };
    } catch (error: any) {
      console.error("Error in getStudentDataWithFranchiseAndCenterService:", error);
      throw new Error(`Error retrieving student data with franchise and center: ${error.message}`);
    }
  };