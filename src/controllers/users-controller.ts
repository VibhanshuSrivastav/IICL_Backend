// adminController.ts
import { Request, Response } from 'express';

export const getUsersDashboard = (req: Request, res: Response): void => {
  // Example logic to send data to the view
  const dashboardData = {
    message: 'Welcome to the Users Dashboard',
  };
  res.status(200).json(dashboardData);
};


