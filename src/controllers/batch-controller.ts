import { Request, Response } from 'express';
import BatchModel from '../models/batchModel.js';

// Function to add a new batch
export const addBatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const batchData = req.body;
        const newBatch = new BatchModel(batchData);
        await newBatch.save();
        res.status(201).json(newBatch);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: 'Failed to add batch', details: errorMessage });
    }
};

// Function to get all batches
export const fetchBatch = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Fetching batches...');
        const batches = await BatchModel.find();
        res.status(200).json(batches);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: 'Failed to fetch batches', details: errorMessage });
    }
};