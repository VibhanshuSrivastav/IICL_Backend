// controllers/profileController.ts
import { Request, Response, NextFunction } from 'express';
import { getFranchiseProfileService } from '../services/profileDataServices.js';

/**
 * Controller to handle GET requests for franchise profiles.
 * Expects a route parameter `franchiseId`.
 */
export const getFranchiseProfileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { franchiseId } = req.params;
    const profiles = await getFranchiseProfileService(franchiseId);
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};
