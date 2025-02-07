// src/routes/auth.ts
import { Router } from "express";
import { login, registerAdmin, registerFranchise } from "../controllers/auth.controller";
import { authenticate, authorize } from "../middlewares/auth";

const router = Router();

// Public endpoints for login and registration
router.post("/login", login);
router.post("/register/admin", registerAdmin);
router.post("/register/franchise", registerFranchise);

// Example of protected routes if needed
router.get("/admin", authenticate, authorize(["admin"]), (req, res): void => {
  res.json({ message: "Welcome, admin!" });
});

router.get(
  "/franchise",
  authenticate,
  authorize(["franchise"]),
  (req, res): void => {
    res.json({ message: "Welcome, franchise user!" });
  }
);

export default router;
