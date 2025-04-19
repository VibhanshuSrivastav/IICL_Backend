import express from "express";
import { addCourseData, getCourseData, deleteCourseData } from "../controllers/course-controller.js";
const router = express.Router();


router.post('/add-course', addCourseData);
router.get('/get-course', getCourseData);
router.delete('/delete-course/:courseId', deleteCourseData);
// router.delete('/delete-course/:courseId', deleteCourseData);

export default router
