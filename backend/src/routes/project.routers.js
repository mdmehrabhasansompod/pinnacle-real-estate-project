import express from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers.js";

import upload from "../middlewares/multer.js"; // ✅ Multer middleware

const router = express.Router();

router.get("/", getProjects);
router.post("/", upload.single("image"), createProject); // ✅ handle image
router.get("/:id", getProjectById);
router.put("/:id", upload.single("image"), updateProject); // ✅ handle image
router.delete("/:id", deleteProject);

export default router;
