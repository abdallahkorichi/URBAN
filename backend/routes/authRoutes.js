import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();
// Register and login routes for user authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
