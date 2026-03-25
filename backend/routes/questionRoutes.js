import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {getQuestions} from "../controllers/questionController.js";

const router = express.Router();

router.get("/", protect, getQuestions);

export default router;
