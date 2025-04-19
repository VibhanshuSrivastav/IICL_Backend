import express from 'express';
import { checkStudentExistsController, getStudentDataByEnrollmentId } from '../controllers/studentDetails-controller.js';


const router = express.Router();


router.get('/student-details/:enrollmentId', getStudentDataByEnrollmentId);
//check-student-exists
router.post('/check-student-exists', checkStudentExistsController);

export default router;
