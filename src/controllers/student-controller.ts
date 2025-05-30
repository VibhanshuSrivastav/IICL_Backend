import { Request, Response, NextFunction } from 'express';
import { setStudentDataService, getStudentListDataService, editStudentDataByEnrollmentId,getAllStudentsService, addStudentMarks, getStudentMarksByEnrollmentIdService, editStudentMarksByEnrollmentIdService, deleteStudentMarksByEnrollmentIdService, getAllStudentListDataService, deleteStudentService, setIssueDateForStudentService, setStudentCertificationStatusService } from '../services/studentServices.js';

export const setStudentData = async (req: Request, res: Response) => {
    try {
      console.log("Request body:", req.body);
      const studentData = { ...req.body };
  
      // If a file was uploaded, attach its buffer and MIME type to the studentData.image property
      if (req.file) {
        studentData.image = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }
  
      const result = await setStudentDataService(studentData);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  export const getStudentsListData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const franchiseId = req.params.franchiseId;
      const students = await getStudentListDataService(franchiseId);
  
      if (!students || students.length === 0) {
        res.status(404).json({ error: "No students found" });
        return;
      }
  
      // Map over each student and convert the image buffer to a base64 string (if available)
      const studentsWithImages = students.map((student) => {
        let imageBase64 = "";
        if (student.image && student.image.data) {
          imageBase64 = student.image.data.toString("base64");
        }
        return {
          ...student.toObject(),
          imageBase64, // Include the base64 image in the response
        };
      });
  
      res.status(200).json(studentsWithImages);
    } catch (error: any) {
      next(error);
    }
  };

  export const getAllStudentsListData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
    
      const students = await getAllStudentListDataService();
  
      if (!students || students.length === 0) {
        res.status(404).json({ error: "No students found" });
        return;
      }
  
      // Map over each student and convert the image buffer to a base64 string (if available)
      const studentsWithImages = students.map((student) => {
        let imageBase64 = "";
        if (student.image && student.image.data) {
          imageBase64 = student.image.data.toString("base64");
        }
        return {
          ...student.toObject(),
          imageBase64, // Include the base64 image in the response
        };
      });
  
      res.status(200).json(studentsWithImages);
    } catch (error: any) {
      next(error);
    }
  };


export const getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const students = await getAllStudentsService();

        if (!students || students.length === 0) {
            res.status(404).json({ error: "No students found" });
            return;
        }

        // Map over each student and convert the image buffer to a base64 string (if available)
        const studentsWithImages = students.map((student) => {
            let imageBase64 = "";
            if (student.image && student.image.data) {
                imageBase64 = student.image.data.toString("base64");
            }
            return {
                ...student.toObject(),
                imageBase64, // Include the base64 image in the response
            };
        });

        res.status(200).json(studentsWithImages);
    } catch (error: any) {
        next(error);
    }
};


  export const editStudentDataByEnrollmentIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("Update request body:", req.body);
      const enrollmentId = req.params.enrollmentId;
      const updatedData = req.body;
  
      const updatedStudent = await editStudentDataByEnrollmentId(enrollmentId, updatedData);
  
      if (!updatedStudent) {
        res.status(404).json({ error: "Student not found" });
        return;
      }
  
      res.status(200).json(updatedStudent);
    } catch (error: any) {
      next(error);
    }
  };


  
  export const addEditStudentMarksByEnrollmentId = async (
    req: Request,
    res: Response
   ): Promise<void> => {
    try {
      const { enrollmentId } = req.params;
      const marksData = req.body;
  
      const result = await addStudentMarks(enrollmentId, marksData);
  
      res.status(result.status ? 200 : 404).json(result);
      return
    } catch (error) {
      console.error("Error updating student marks:", error);
      res.status(500).json({ status: false, message: "Internal server error" });
      return
    }
  };

  export const getStudentMarksByEnrollmentId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const enrollmentId = req.params.enrollmentId;
      const marks = await getStudentMarksByEnrollmentIdService(enrollmentId);
      res.status(200).json(marks);
    } catch (error) {
      next(error);
    }
  };

  // Controller to edit a student's mark
export const editStudentMarksByEnrollmentId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const enrollmentId = req.params.enrollmentId;
    // Expecting the updated mark data in the request body.
    const updatedMarkData = req.body;
    
    // Call the service function that updates the mark in the DB.
    const updatedMark = await editStudentMarksByEnrollmentIdService(enrollmentId, updatedMarkData);
    
    if (!updatedMark) {
      res.status(404).json({ status: false, message: "Mark not found" });
      return;
    }
    
    res.status(200).json({ status: true, message: "Mark updated successfully", data: updatedMark });
  } catch (error: any) {
    next(error);
  }
};

// Controller to delete a student's mark
export const deleteStudentMarksByEnrollmentId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const enrollmentId = req.params.enrollmentId;
    // For deletion, we assume that the client sends an identifier for the mark,
    // for example, the subject name.
    const { subject } = req.body;
    
    // Call the service function that deletes the mark from the DB.
    const deletionResult = await deleteStudentMarksByEnrollmentIdService(enrollmentId, subject);
    
    if (!deletionResult) {
      res.status(404).json({ status: false, message: "Mark not found" });
      return;
    }
    
    res.status(200).json({ status: true, message: "Mark deleted successfully" });
  } catch (error: any) {
    next(error);
  }
};

export const deleteStudentController = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const studentId = req.params.studentId;

    if (!studentId) {
      res.status(400).json({ status: false, message: "Student ID is required" });
      return;
    }

    const deletionResult = await deleteStudentService(studentId);

    if (!deletionResult) {
      res.status(404).json({ status: false, message: "Student not found" });
      return;
    }

    res.status(200).json({ status: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};


// Controller to set the issue date for a student's certificate
export const setStudentIssueDateByEnrollmentId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { enrollmentId } = req.params; // Get the enrollment ID from the URL parameter
    const { issueDate } = req.body; // Get the issue date from the request body
    
    if (!issueDate) {
      res.status(400).json({ status: false, message: "Issue date is required" });
      return;
    }

    // Assuming you have a service function to update the issue date for the student
    const updatedStudent = await setIssueDateForStudentService(enrollmentId, issueDate);
    
    if (!updatedStudent) {
      res.status(404).json({ status: false, message: "Student not found" });
      return;
    }

    res.status(200).json({ status: true, message: "Issue date updated successfully", data: updatedStudent });
  } catch (error: any) {
    next(error);
  }
};


export const updateStudentCertificationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { enrollmentId } = req.params; 
    const { status } = req.body; 

    if (!status || !["enable", "disable"].includes(status)) {
      res.status(400).json({ status: false, message: "Invalid or missing status" });
      return;
    }

    const updatedStudent = await setStudentCertificationStatusService(enrollmentId, status);

    if (!updatedStudent) {
      res.status(404).json({ status: false, message: "Student not found" });
      return;
    }

    res.status(200).json({ status: true, message: "Certification status updated successfully", data: updatedStudent });
  } catch (error: any) {
    next(error);
  }
};
