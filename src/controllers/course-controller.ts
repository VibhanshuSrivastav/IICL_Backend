import { Request, Response } from "express";
import CourseModel from "../models/courseModel.js";
import { deflate } from "zlib";

export const addCourseData = async (req: Request, res: Response) => {
    try {
        const courseData = req.body;
        const newCourse = new CourseModel(courseData);
        await newCourse.save();
          res.status(201).json(newCourse);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: 'Failed to add course', details: errorMessage });
    }
}


export const getCourseData = async (req: Request, res: Response):Promise<void> => {
    try {
        const courses = await CourseModel.find();
        res.status(200).json(courses);
        console.log("fetching courses data::", courses);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({error: "Failed to get course data", details:errorMessage});
    }
}

export const deleteCourseData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { courseId } = req.params;  // Destructuring based on your route param
        const deletedCourse = await CourseModel.findByIdAndDelete(courseId);
        
        if (!deletedCourse) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }
        
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: 'Failed to delete course', details: errorMessage });
    }
};
