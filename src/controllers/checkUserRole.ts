import FranchiseAdmissionModel from "../models/FranchiseAdmissionData.js";
import { Request, Response } from "express";

export async function checkUserRole(req: Request, res: Response): Promise<void> {
  const { email } = req.body;

  try {
    const user = await FranchiseAdmissionModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Error checking role" });
  }
}