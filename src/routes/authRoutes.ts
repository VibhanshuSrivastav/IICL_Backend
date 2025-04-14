import express from "express";
import {
  changePasswordController,
  franchiseLoginController,
  franchiseLogoutController,
} from "../controllers/auth-controller.js";
import { checkUserRole } from "../controllers/checkUserRole.js";

const router = express.Router();

// Login route
router.post("/check-role",checkUserRole);
router.post("/login", franchiseLoginController);

// Logout route
router.post("/logout", franchiseLogoutController);
router.post("/change-password", changePasswordController);


export default router;
