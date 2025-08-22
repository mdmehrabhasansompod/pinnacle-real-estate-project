import express from "express";
import upload from "../middlewares/multer.js";
import {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} from "../controllers/team.controllers.js";

const router = express.Router();

router.get("/", getTeams);
router.post("/", upload.single("image"), createTeam);
router.get("/:id", getTeamById);
router.put("/:id", upload.single("image"), updateTeam);
router.delete("/:id", deleteTeam);

export default router;
