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
      const franchiseId = req.params.franchiseId;
        console.log('Fetching batches...');
        const batches = await BatchModel.find({franchiseId});
        res.status(200).json(batches);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: 'Failed to fetch batches', details: errorMessage });
    }
};

// Function to delete a batch by ID
export const deleteBatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const batchId = req.params._id;
        const deletedBatch = await BatchModel.findByIdAndDelete(batchId);
        if (!deletedBatch) {
            res.status(404).json({ error: 'Batch not found' });
        }
        res.status(200).json({ message: 'Batch deleted successfully' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: 'Failed to delete batch', details: errorMessage });
    }
};

// Function to get a batch by ID
export const getBatchById = async (req: Request, res: Response): Promise<void> => {
    try {
        const batchId = req.params._id;
        const batch = await BatchModel.findById(batchId);
        if (!batch) {
            res.status(404).json({ error: 'Batch not found' });
            return;
        }
        res.status(200).json(batch);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: 'Failed to fetch batch', details: errorMessage });
    }
};

// Function to edit a batch by ID
export const editBatchById = async (req: Request, res: Response): Promise<void> => {
    try {
        const batchId = req.params._id;
        const updatedData = req.body;
        const updatedBatch = await BatchModel.findByIdAndUpdate(batchId, updatedData, { new: true });
        if (!updatedBatch) {
            res.status(404).json({ error: 'Batch not found' });
            return;
        }
        res.status(200).json(updatedBatch);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: 'Failed to update batch', details: errorMessage });
    }
};