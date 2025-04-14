import { Request } from "express";
import FranchiseAdmissionModel from "../models/FranchiseAdmissionData.js";
import studentModel from "../models/studentModel.js";
// import StudentModel from "../models/StudentModel.js"; // Uncomment if you want to include student data
import bcrypt from "bcrypt";

interface LoginResult {
  user: {
    email: string;
    role: string;
  };
  franchiseId?: number;
  adminId?: number;
  message: string;
  data?: {
    franchises: any[];
    students?: any[]; // Optional
  };
}

export const franchiseLoginService = async (
  req: Request,
  email: string,
  password: string
): Promise<LoginResult> => {
  const user = await FranchiseAdmissionModel.findOne({ email });

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (!["franchise", "admin"].includes(user.role)) {
    throw new Error("Unauthorized role");
  }

  req.session.user = { email: user.email, role: user.role };
  req.session.franchiseId = user.franchiseId ?? undefined;
  req.session.adminId = user.adminId ?? undefined;
  req.session.cookie.maxAge = 12 * 60 * 60 * 1000; // 12 hours

  let data: LoginResult["data"] = undefined;

  if (user.role === "admin") {
    const franchises = await FranchiseAdmissionModel.find({});
    const students = await studentModel.find({});
    data = {
      franchises,
      students,
    };
  }

  return {
    user: { email: user.email, role: user.role },
    franchiseId: user.role === "franchise" ? user.franchiseId : undefined,
    adminId: user.role === "admin" ? user.adminId : undefined,
    message: "Login successful",
    ...(data && { data }),
  };
};

export const changePasswordService = async (
  email: string,
  newPassword: string
): Promise<string> => {
  const user = await FranchiseAdmissionModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  await FranchiseAdmissionModel.updateOne({ email }, { password: hashedPassword });

  return "Password changed successfully";
};