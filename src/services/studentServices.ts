import StudentModel from '../models/studentModel.js';
import { IStudent } from '../models/studentModel.js';
import {IMark} from '../models/studentModel.js';
import FranchiseAdmissionModel from '../models/FranchiseAdmissionData.js';

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

    export const getAllStudentsService = async (
        page: number = 1,
        limit: number = 10,
        search: string = ""
    ): Promise<{ students: IStudent[]; total: number; page: number; limit: number; totalPages: number }> => {
        try {
            const skip = (page - 1) * limit;
            
            // Build search query - search in name and email fields (case-insensitive)
            let searchQuery: any = {};
            if (search && search.trim() !== "") {
                const searchRegex = new RegExp(search.trim(), "i"); // Case-insensitive regex
                searchQuery = {
                    $or: [
                        { name: searchRegex },
                        { email: searchRegex },
                        { enrollmentId: searchRegex },
                        { phone: searchRegex }
                    ]
                };
            }
            
            // Get total count and paginated students in parallel
            // Sort by _id descending for consistent pagination (newest first)
            // _id is always present and contains timestamp, ensuring stable pagination
            // This prevents duplicate/missing records when navigating between pages
            const [students, total] = await Promise.all([
                StudentModel.find(searchQuery)
                    .sort({ _id: -1 }) // Sort by _id descending (newest first) for consistent pagination
                    .skip(skip)
                    .limit(limit)
                    .lean(), // Use lean() for better performance with large datasets
                StudentModel.countDocuments(searchQuery)
            ]);

            // Get unique franchiseIds from students
            const franchiseIds = [...new Set(students.map((s: any) => s.franchiseId).filter(Boolean))];

            // Fetch franchise information by franchiseId
            // Convert string franchiseId to number for matching (franchise model has franchiseId as number)
            // Convert all franchiseIds to numbers and filter out invalid ones
            const franchiseIdNumbers = franchiseIds
                .map((id: string) => Number(id))
                .filter((num: number) => !isNaN(num));

            const franchises = franchiseIdNumbers.length > 0
                ? await FranchiseAdmissionModel.find({
                    franchiseId: { $in: franchiseIdNumbers }
                }).select('franchiseId instituteName centerId').lean()
                : [];

            // Get unique centerIds from franchise records
            const centerIds = [...new Set(franchises.map((f: any) => f.centerId).filter(Boolean))];

            // Fetch center information by centerId
            // Center name might be stored in another franchise record with matching centerId
            const centers = await FranchiseAdmissionModel.find({
                centerId: { $in: centerIds }
            }).select('centerId instituteName').lean();

            // Create lookup maps for quick access
            const franchiseMap = new Map(
                franchises.map((f: any) => [
                    String(f.franchiseId),
                    {
                        franchiseName: f.instituteName || 'N/A',
                        centerId: f.centerId || null
                    }
                ])
            );
            const centerMap = new Map(
                centers.map((c: any) => [
                    c.centerId,
                    c.instituteName || 'N/A'
                ])
            );

            // Enrich students with franchise and center names
            const studentsWithDetails = students.map((student: any) => {
                const franchiseInfo = franchiseMap.get(String(student.franchiseId));
                const franchiseName = franchiseInfo?.franchiseName || 'N/A';
                const centerId = franchiseInfo?.centerId || null;
                const centerName = centerId ? (centerMap.get(centerId) || 'N/A') : 'N/A';

                return {
                    ...student,
                    franchiseName,
                    centerName
                };
            });

            const totalPages = Math.ceil(total / limit);

            return {
                students: studentsWithDetails,
                total,
                page,
                limit,
                totalPages
            };
        } catch (error: any) {
            console.error("Error in getAllStudentsService:", error);
            throw new Error(`Error retrieving all students: ${error.message}`);
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
    
    // Service function to update the issue date for a student in the database
    export const setIssueDateForStudentService = async (
      enrollmentId: string,
      issueDate: string
    ): Promise<IStudent | null> => {
      try {
        const updatedStudent = await StudentModel.findOneAndUpdate(
          { enrollmentId },
          { issueDate }, // Update the issue date
          { new: true }
        );
        return updatedStudent;
      } catch (error) {
        console.error("Error updating issue date:", error);
        throw new Error("Error updating issue date");
      }
    };

export const setStudentCertificationStatusService = async (
  enrollmentId: string,
  certificationStatus: boolean
): Promise<IStudent | null> => {
  try {
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { enrollmentId },
      { certificationStatus },
      { new: true }
    );
    return updatedStudent;
  } catch (error) {
    console.error("Error updating certification status:", error);
    throw new Error("Error updating certification status");
  }
};