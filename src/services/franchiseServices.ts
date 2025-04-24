import FormDataModel, { IFormData } from "../models/FormData.js";
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

export const getFranchiseEnquiryService = async (): Promise<IFormData[]> => {
  try {
    const franchiseEnquiry = await FormDataModel.find();
    return franchiseEnquiry;
  } catch (error) {
    throw new Error(`Error fetching franchise data: ${error}`);
  }
};

export const deleteFranchiseEnquiryService = async (id: string) => {
  try {
    const result = await FormDataModel.findByIdAndDelete(id);
    return result
  } catch (error: any) {
    console.error("Error in deleteFranchiseEnquiryService:", error);
    throw new Error("Error deleting franchise enquiry");
  }
};