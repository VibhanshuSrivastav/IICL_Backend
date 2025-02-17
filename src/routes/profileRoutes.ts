import { Router, Request, Response, NextFunction } from 'express';
import { getProfileData } from '../services/profileDataServices.js';

const router = Router();



// Route to get user profile
router.get('/profile-data', async (req: any, res, next) => {
  try {
	const userId = req.user.id; // Assuming user ID is available in req.user
	const profileData = await getProfileData(userId);
	res.json(profileData);
  } catch (error) {
	next(error);
  }
});

export default router;