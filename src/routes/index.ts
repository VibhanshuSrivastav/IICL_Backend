import express from 'express';
import adminRoutes from './admin-routes.js';
import userRoutes from './users-routes.js';
import franchiseRoutes from './franchiseRoutes.js'; // ✅ Import Franchise Routes
import batchRoutes from './batchRoutes.js'; // ✅ Import Batch Routes
import contactUsRoutes from './contactUsRoutes.js'; // ✅ Import Contact Us Routes
import profileRoutes from './profileRoutes.js'; // ✅ Import Profile Routes
const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/users', userRoutes);
router.use('/franchise', franchiseRoutes); // ✅ Add Franchise Routes
router.use('/batch', batchRoutes); // ✅ Add Batch Routes
router.use('/contact', contactUsRoutes); // ✅ Add Contact Us Routes
router.use('/profile', profileRoutes); // ✅ Add Profile Routes
export default router;
