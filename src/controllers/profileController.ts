import express from 'express';
import { getProfileData } from '../services/profileDataServices.js';

const router = express.Router();

router.post('/profile-data', async (req, res) => {
  try {
	const userId = req.body.userId;
	const profileData = await getProfileData(userId);
	res.json(profileData);
  } catch (error) {
	if (error instanceof Error) {
	  res.status(500).send(error.message);
	} else {
	  res.status(500).send('An unknown error occurred');
	}
  }
});

export default router; 