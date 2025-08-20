import express from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers.js";

const router = express.Router();

router.get("/", getProjects);           // GET all projects
router.post("/", createProject);        // POST create new project
router.get("/:id", getProjectById);     // GET project by ID
router.put("/:id", updateProject);      // PUT update project
router.delete("/:id", deleteProject);   // DELETE project

export default router;
