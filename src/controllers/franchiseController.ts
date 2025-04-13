import { NextFunction, Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcrypt';

import FormDataModel from '../models/FormData.js';
import FranchiseAdmissionModel from '../models/FranchiseAdmissionData.js';
import { editFranchiseDataByAdminService, getFranchiseService } from '../services/franchiseServices.js';


// Submit Franchise Form
export const submitFranchiseForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const newForm = new FormDataModel(req.body);
    await newForm.save();
    res.status(201).json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'Failed to submit form' });
  }
};

// Franchise Login
export const franchiseLogin: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const franchise = await FranchiseAdmissionModel.findOne({ email });

    if (!franchise) {
        res.status(404).json({ success: false, message: 'Franchise email not found' });
        return 
    }

    const isMatch = await franchise.comparePassword(password);
    if (!isMatch) {
        res.status(401).json({ success: false, message: 'Invalid Password' });
        return
    }
    res.status(200).json({
      success: true,
      message: 'Login successful',
      franchiseId: franchise.franchiseId,
    });
  } catch (error) {
    console.error('Error during login:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Failed to login' });
    }
  }
};

// Add Franchise by Admin
export const addFranchiseByAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      firstName, lastName, dob, directorName, instituteName,
      city, state, address, mobile, email, aadharId, password, franchiseId,
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !dob || !directorName || !instituteName ||
        !city || !state || !address || !mobile || !email || !aadharId || !password) {
          res.status(400).json({ success: false, message: 'All fields are required' });
      return 
    }

    // Check for existing franchise
    const existing = await FranchiseAdmissionModel.findOne({ email });
    if (existing) {
      res.status(400).json({ success: false, message: 'Franchise already exists' });
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFranchise = new FranchiseAdmissionModel({
      firstName, 
      lastName, 
      dob, 
      directorName, 
      instituteName,
      city, 
      state, 
      address, 
      mobile, 
      email, 
      aadharId,
      password: hashedPassword,
      franchiseId,
      role:"franchise"
    });

    await newFranchise.save();
    res.status(201).json({ success: true, message: 'Franchise added successfully!' });
  } catch (error) {
    console.error('Error adding franchise:', error);
    res.status(500).json({ success: false, message: 'Failed to add franchise' });
  }
};

// Get Franchise Data
export const getFranchiseData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const franchises = await getFranchiseService();

    if (!franchises || franchises.length === 0) {
      res.status(404).json({ success: false, message: 'No franchise found' });
      return 
    }

    res.status(200).json(franchises);
  } catch (error) {
    console.error('Error getting franchise data:', error);
    next(error);
  }
};

// Get Franchise Data by ID
export const getFranchiseDataById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const franchise = await FranchiseAdmissionModel.findById(req.params._id);

    if (!franchise) {
      res.status(404).json({ success: false, message: 'Franchise not found' });
      return 
    }

    res.status(200).json(franchise);
  } catch (error) {
    console.error('Error getting franchise data by ID:', error);
    next(error);
  }
};

// Delete Franchise Data by Admin
export const deleteFranchiseDataByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const franchiseId = req.params._id;
    const deletedFranchise = await FranchiseAdmissionModel.findByIdAndDelete(franchiseId);

    if (!deletedFranchise) {
      res.status(404).json({ success: false, message: 'Franchise not found' });
      return 
    }

    res.status(200).json({ success: true, message: 'Franchise deleted successfully!' });
  } catch (error) {
    console.error('Error deleting franchise:', error);
    next(error);
  }
};

// Edit Franchise Data by Admin
export const editFranchiseDataByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedFranchise = await editFranchiseDataByAdminService(req.params._id, req.body);
    res.status(200).json(updatedFranchise);
  } catch (error) {
    console.error('Error editing franchise:', error);
    next(error);
  }
};
