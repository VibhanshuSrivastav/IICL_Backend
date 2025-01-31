import express from 'express';
import { getUsersDashboard } from '../controllers/users-controller';

const router = express.Router();

router.get('/', getUsersDashboard) // Get Users Dashboard

export default router
