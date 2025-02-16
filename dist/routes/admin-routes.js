import express from 'express';
import { getAdminDashboard } from '../controllers/admin-controller.js';
const router = express.Router();
router.get('/', getAdminDashboard); // Get admin-dashboard
export default router;
