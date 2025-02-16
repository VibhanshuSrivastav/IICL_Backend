import express from 'express';
import { addBatch, fetchBatch } from '../controllers/batch-controller.js';

const router = express.Router();

// Route to add a new batch
router.post('/add-batch', addBatch);

// Route to get all batches
router.get('/fetch', fetchBatch);

export default router;