import express from "express";
import upload from "../middlewares/multer.js"; // import multer middleware

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controllers.js";

const router = express.Router();

router.get("/", getServices);
router.post("/",upload.single("image"), createService);
router.put("/:id", upload.single("image"),updateService);
router.delete("/:id", deleteService);

export default router;
