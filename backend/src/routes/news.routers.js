import express from "express";
import upload from "../middlewares/multer.js"; // Multer middleware

import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/news.controllers.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getNewsById);
router.post("/", upload.single("image"), createNews); // image required
router.put("/:id", upload.single("image"), updateNews); // image optional
router.delete("/:id", deleteNews);

export default router;
