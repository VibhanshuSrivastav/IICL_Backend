import express from 'express';
import getAdminDashboard from '../controllers/admin-controller';

const router = express.Router();

router.get('/' , getAdminDashboard) // Get admin-dashboard

export default router
