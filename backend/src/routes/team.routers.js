import express from "express";
import {
  createTeamMember,
  getTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/team.controllers.js";

const router = express.Router();

// POST: add team member
router.post("/", createTeamMember);

// GET: get all team members
router.get("/", getTeamMembers);

// GET: get single member by ID
router.get("/:id", getTeamMemberById);

// PUT: update member by ID
router.put("/:id", updateTeamMember);

// DELETE: delete member by ID
router.delete("/:id", deleteTeamMember);

export default router;
