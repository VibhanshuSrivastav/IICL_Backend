import { Router, Request, Response, NextFunction } from 'express';

import { getFranchiseProfileController } from '../controllers/profileController.js';

const router = Router();

router.get("/franchise-profile/:franchiseId", getFranchiseProfileController);

export default router;
