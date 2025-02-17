import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import FormDataModel from '../models/FormData.js';
import FranchiseAdmissionModel from '../models/FranchiseAdmissionData.js';

export const submitFranchiseForm = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('hitting submitFranchiseForm', req.body);

        // Save data to MongoDB
        const newForm = new FormDataModel(req.body);
        await newForm.save();

        res.status(201).json({ success: true, message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error saving form:', error);
        res.status(500).json({ success: false, message: 'Failed to submit form' });
    }
};

export const franchiseLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('hitting franchiseLogin', req.body);

        // ✅ Find franchise by email
        const franchise = await FormDataModel.findOne({ email: req.body.email });

        if (!franchise) {
            res.status(404).json({ success: false, message: 'Franchise not found' });
            return;
        }

        // ✅ Ensure TypeScript recognizes the model correctly
        if (!franchise.comparePassword) {
            res.status(500).json({ success: false, message: 'comparePassword method is undefined' });
            return;
        }

        // ✅ Check password
        const isMatch = await franchise.comparePassword(req.body.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        res.status(200).json({ success: true, message: 'Login successful', franchise });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Failed to login' });
    }
};

export const addFranchiseByAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('hitting addFranchiseByAdmin', req.body);

        const { firstName, lastName, dob, directorName, instituteName, address, mobile, email, aadharId, password } = req.body;

        // ✅ Validate input fields
        if (!firstName || !lastName || !dob || !directorName || !instituteName || !address || !mobile || !email || !aadharId || !password) {
            res.status(400).json({ success: false, message: 'All fields are required' });
            return;
        }

        // ✅ Check if franchise already exists
        const existingFranchise = await FranchiseAdmissionModel.findOne({ email });
        if (existingFranchise) {
            res.status(400).json({ success: false, message: 'Franchise already exists' });
            return;
        }

        // ✅ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create and save new franchise data
        const newFranchise = new FranchiseAdmissionModel({
            firstName,
            lastName,
            dob,
            directorName,
            instituteName,
            address,
            mobile,
            email,
            aadharId,
            password: hashedPassword,
        });

        await newFranchise.save();

        res.status(201).json({ success: true, message: 'Franchise added successfully!' });
    } catch (error) {
        console.error('Error adding franchise:', error);
        res.status(500).json({ success: false, message: 'Failed to add franchise' });
    }
};
