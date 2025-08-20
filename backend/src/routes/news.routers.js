import express from "express";
import {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/news.controllers.js";

const router = express.Router();

router.post("/", createNews);        // Create news
router.get("/", getNews);            // Get all news
router.get("/:id", getNewsById);     // Get single news
router.put("/:id", updateNews);      // Update news
router.delete("/:id", deleteNews);   // Delete news

export default router;
