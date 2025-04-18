import { Request, Response, NextFunction } from 'express';
import { getStudentDataService } from '../services/studentDetailsServices.js';


//checkStudentExistsController
export const checkStudentExistsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { enrollmentId } = req.body; 
  
      if (!enrollmentId) {
        res.status(400).json({ status: false, message: "Enrollment ID is required" });
        return;
      }
  
      const studentExists = await getStudentDataService(enrollmentId);
  
      if (studentExists) {
        res.status(200).json({ exists: true, message: "Student exists" }); 
      } else {
        res.status(404).json({ exists: false, message: "Student does not exist" });
      }
    } catch (error) {
      console.error("Error checking student existence:", error);
      res.status(500).json({ exists: false, message: "Internal server error" });
    }
  };

  
    export const getStudentDataByEnrollmentId = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const enrollmentId = req.params.enrollmentId;

        if (!enrollmentId) {
          res.status(400).json({ error: "Enrollment ID is required" });
            return;
        }
        const student = await getStudentDataService(enrollmentId);
    
        if (!student) {
          res.status(404).json({ error: "No student found" });
          return;
        }
    
        // Convert the Mongoose document to a plain JavaScript object.
        const studentObj = student.toObject();
    
        // If the student has an image, convert its buffer to a Base64 string.
        if (studentObj.image && studentObj.image.data) {
          // You can either return just the base64 string...
          studentObj.imageBase64 = studentObj.image.data.toString("base64");
    
          // ...or create a full data URL using the content type.
          // For example:
          // studentObj.imageUrl = `data:${studentObj.image.contentType};base64,${studentObj.image.data.toString("base64")}`;
        }
    
        res.status(200).json(studentObj);
      } catch (error: any) {
        next(error);
      }
    };
    