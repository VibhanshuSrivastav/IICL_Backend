import { Request, Response } from "express";
import "express-session";
import { franchiseLoginService } from "../services/authServices.js";

declare module "express-session" {
  interface SessionData {
    user?: { email: string; role: string };
    franchiseId?: number;
    adminId?: number;
  }
}

// LOGIN CONTROLLER
export const franchiseLoginController = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  
  
  try {
    const loginResult = await franchiseLoginService(req, email, password);
    // Set cookie manually (optional, for frontend auth check)
    res.cookie("user", JSON.stringify(loginResult.user), {
      maxAge: 12 * 60 * 60 * 1000, // 12 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json(loginResult);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};

// LOGOUT CONTROLLER
export const franchiseLogoutController = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie("connect.sid");
    res.clearCookie("user");
    return res.status(200).json({ message: "Logout successful", clearLocalStorage: true });
  });
};
