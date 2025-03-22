import express from 'express';
import {  addFranchiseByAdmin, editFranchiseDataByAdmin, franchiseLogin, getFranchiseData, submitFranchiseForm } from '../controllers/franchiseController.js';

const router = express.Router();

// Define POST route to handle form submission
router.post('/franchise-enquiry', submitFranchiseForm);
router.post('/franchise-login',franchiseLogin);
router.post('/add-franchise', addFranchiseByAdmin);
router.get('/get-franchises', getFranchiseData);
router.put("/add-franchise/:_id", editFranchiseDataByAdmin);

export default router;
