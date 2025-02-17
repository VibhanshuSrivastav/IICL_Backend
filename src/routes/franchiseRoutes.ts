import express from 'express';
import { addFranchiseByAdmin, franchiseLogin, submitFranchiseForm } from '../controllers/franchiseController.js';

const router = express.Router();

// Define POST route to handle form submission
router.post('/franchise-enquiry', submitFranchiseForm);
router.post('/franchise-login', franchiseLogin);
router.post('/add-franchise', addFranchiseByAdmin);

export default router;
