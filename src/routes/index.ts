import express from 'express';
import adminRoutes from './admin-routes';
import userRoutes from './users-routes';

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/users', userRoutes);

export default router;
