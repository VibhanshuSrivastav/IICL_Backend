import express from 'express';
import {  addFranchiseByAdmin,
     editFranchiseDataByAdmin,
      franchiseLogin,
       getFranchiseData,
        submitFranchiseForm,
         getFranchiseDataById,
         deleteFranchiseDataByAdmin, 
         getFranchiseEnquiry,
         deleteFranchiseEnquiryController} from '../controllers/franchiseController.js';

const router = express.Router();

// Define POST route to handle form submission
router.post('/franchise-enquiry', submitFranchiseForm);
router.post('/franchise-login',franchiseLogin);
router.post('/add-franchise', addFranchiseByAdmin);
router.get('/get-franchise/:_id', getFranchiseDataById);
router.get('/get-franchises', getFranchiseData);
router.put("/edit-franchise/:_id", editFranchiseDataByAdmin);
router.delete("/delete-franchise/:_id", deleteFranchiseDataByAdmin);
router.get('/get-franchise-enquiry', getFranchiseEnquiry);
router.delete('/delete-franchise-enquiry/:id', deleteFranchiseEnquiryController);
export default router;
