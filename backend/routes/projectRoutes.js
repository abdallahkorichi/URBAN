import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectStatus,
  updateProjectStatus,
} from "../controllers/projectController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


router.get("/my", protect, getMyProjects);
router.get("/", protect, getAllProjects);
router.get("/stats", protect, getProjectStatus);
router.put("/:id/status", protect, updateProjectStatus);

router.post("/", protect, upload.single("pdf"), createProject);

export default router;
