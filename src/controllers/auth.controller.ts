// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import User, { IUser, UserRole } from "../models/user";

// Register admin (only one admin is allowed)
export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if an admin already exists
    const existingAdmin: IUser | null = await User.findOne({ role: UserRole.ADMIN });
    if (existingAdmin) {
      res.status(400).json({ message: "Admin already registered" });
      return;
    }

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const admin = new User({
      email,
      password,
      role: UserRole.ADMIN,
    });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Register franchise (multiple allowed)
export const registerFranchise = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    // Optionally derive username from email or receive it in the payload.
    // For example, you might use the part of the email before "@" as username:
    const username = email.split("@")[0];

    const franchise = new User({
      email,
      password,
      role: UserRole.FRANCHISE,
      username, // Make sure your schema supports username
    });

    await franchise.save();
    res.status(201).json({ message: "Franchise registered successfully" });
  } catch (error: any) {
    console.error("Error registering franchise:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// (Optional) Existing login controller for authentication
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role } as JwtPayload,
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
