import express from 'express';
import adminRoutes from './admin-routes.js';
import userRoutes from './users-routes.js';
import franchiseRoutes from './franchiseRoutes.js'; // ✅ Import Franchise Routes
import batchRoutes from './batchRoutes.js'; // ✅ Import Batch Routes
import contactUsRoutes from './contactUsRoutes.js'; // ✅ Import Contact Us Routes
import profileRoutes from './profileRoutes.js'; // ✅ Import Profile Routes
import studentRoutes from './studentRoutes.js'; // ✅ Import student Routes
import coursesRoutes from './coursesRoutes.js';
import authRoutes from './authRoutes.js';
import { isAuthenticated } from '../middlewares/auth-middlewares.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contact', contactUsRoutes); // ✅ Add Contact Us Routes
router.use(isAuthenticated);

router.use('/admin',adminRoutes);
router.use('/users', userRoutes);
router.use('/franchise', franchiseRoutes); // ✅ Add Franchise Routes
router.use('/batch', batchRoutes); // ✅ Add Batch Routes
router.use('/profile', profileRoutes); // ✅ Add Profile Routes
router.use('/student', studentRoutes);
router.use('/course', coursesRoutes);
export default router;
