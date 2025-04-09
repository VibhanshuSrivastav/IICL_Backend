import express from "express";
import {
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


export default router;
