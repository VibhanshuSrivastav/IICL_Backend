import FranchiseAdmissionModel from "../models/FranchiseAdmissionData.js";
import { IFranchiseAdmission } from "../models/FranchiseAdmissionData.js";
import bcrypt from 'bcrypt';


export const getFranchiseService = async (): Promise<IFranchiseAdmission[]> => {
  try {
    const franchises = await FranchiseAdmissionModel.find({ role: { $ne: "admin" } });
    return franchises;
  } catch (error) {
    throw new Error(`Error fetching franchise data: ${error}`);
  }
};


export const editFranchiseDataByAdminService = async (_id: string, updatedData: any) => {
  try {
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedFranchise = await FranchiseAdmissionModel.findByIdAndUpdate(
      _id,
      updatedData,
      { new: true }
    );

    if (!updatedFranchise) {
      throw new Error("Franchise not found");
    }

    return updatedFranchise;
  } catch (error) {
    throw error;
  }
};
