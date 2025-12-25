// studentRoutes.ts
import express from 'express';
import multer from 'multer';
import { setStudentData,
     getStudentsListData,
      editStudentDataByEnrollmentIdController,
       getAllStudents,
        addEditStudentMarksByEnrollmentId,
         getStudentMarksByEnrollmentId,
          deleteStudentMarksByEnrollmentId,
           editStudentMarksByEnrollmentId,
            getAllStudentsListData,
             deleteStudentController,
              setStudentIssueDateByEnrollmentId,
              updateStudentCertificationStatus
             } from '../controllers/student-controller.js';
import { getStudentDataByEnrollmentId } from '../controllers/studentDetails-controller.js';

const router = express.Router();

// Use memory storage so the file is available as a buffer in req.file
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Apply the middleware to the /add-student endpoint
router.post('/add-student', upload.single('image'), setStudentData);
router.get("/get-studentsList/:franchiseId", getStudentsListData);
router.get("/get-all-students", getAllStudents); // Paginated endpoint
router.get("/get-studentData/:enrollmentId", getStudentDataByEnrollmentId)
router.put("/edit-studentData/:enrollmentId",upload.single('image'), editStudentDataByEnrollmentIdController);
router.post("/addEditStudentMarks/:enrollmentId", addEditStudentMarksByEnrollmentId);
router.get("/marks/:enrollmentId", getStudentMarksByEnrollmentId);
router.delete('/marks/:enrollmentId', deleteStudentMarksByEnrollmentId);
router.delete('/delete-student/:studentId',deleteStudentController);
router.put('/marks/:enrollmentId', editStudentMarksByEnrollmentId);
router.post('/set-issue-date/:enrollmentId', setStudentIssueDateByEnrollmentId);
router.post('/updateCertificationStatus/:enrollmentId', updateStudentCertificationStatus)
export default router;
