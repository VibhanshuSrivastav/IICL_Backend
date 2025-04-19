// studentRoutes.ts
import express from 'express';
import multer from 'multer';
import { setStudentData, getStudentsListData, editStudentDataByEnrollmentIdController, getAllStudents, addEditStudentMarksByEnrollmentId, getStudentMarksByEnrollmentId, deleteStudentMarksByEnrollmentId, editStudentMarksByEnrollmentId, getAllStudentsListData, deleteStudentController } from '../controllers/student-controller.js';
import { getStudentDataByEnrollmentId } from '../controllers/studentDetails-controller.js';

const router = express.Router();

// Use memory storage so the file is available as a buffer in req.file
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Apply the middleware to the /add-student endpoint
router.post('/add-student', upload.single('image'), setStudentData);
router.get("/get-studentsList/:franchiseId", getStudentsListData);
router.get("/get-all-students", getAllStudentsListData);
router.get("/get-studentData/:enrollmentId", getStudentDataByEnrollmentId)
router.put("/edit-studentData/:enrollmentId",upload.single('image'), editStudentDataByEnrollmentIdController);
router.get('/get-all-students', getAllStudents);
router.post("/addEditStudentMarks/:enrollmentId", addEditStudentMarksByEnrollmentId);
router.get("/marks/:enrollmentId", getStudentMarksByEnrollmentId);
router.delete('/marks/:enrollmentId', deleteStudentMarksByEnrollmentId);
router.delete('/delete-student/:studentId',deleteStudentController);
router.put('/marks/:enrollmentId', editStudentMarksByEnrollmentId);
export default router;
