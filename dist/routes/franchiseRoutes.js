import express from 'express';
import { submitFranchiseForm } from '../controllers/franchiseController.js';
const router = express.Router();
// Define POST route to handle form submission
router.post('/franchise-enquiry', submitFranchiseForm);
export default router;
