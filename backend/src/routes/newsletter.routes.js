import express from "express";
import { subscribeNewsletter } from "../controllers/newsControllers.controllers.js";

const router = express.Router();

router.post("/", subscribeNewsletter);

export default router;
