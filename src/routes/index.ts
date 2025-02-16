import express from 'express';
import adminRoutes from './admin-routes.js';
import userRoutes from './users-routes.js';
import franchiseRoutes from './franchiseRoutes.js'; // ✅ Import Franchise Routes
import batchRoutes from './batchRoutes.js'; // ✅ Import Batch Routes

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/users', userRoutes);
router.use('/franchise', franchiseRoutes); // ✅ Add Franchise Routes
router.use('/batch', batchRoutes); // ✅ Add Batch Routes
export default router;
