import express from 'express';
import { addBatch, fetchBatch, deleteBatch, getBatchById, editBatchById } from '../controllers/batch-controller.js';

const router = express.Router();

// Route to add a new batch
router.post('/add-batch', addBatch);
router.delete('/delete-batch/:_id', deleteBatch);
//  get-batch
// Route to get a batch by ID
router.get('/get-batch/:_id', getBatchById);

// Route to edit a batch by ID
router.put('/update-batch/:_id', editBatchById);
// Route to get all batches
router.get('/get-batches/:franchiseId', fetchBatch);

export default router;