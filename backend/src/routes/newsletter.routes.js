import express from "express";
import {
  subscribeNewsletter,
  getSubscribers,
  unsubscribeNewsletter,
} from "../controllers/newsletter.controllers.js";

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);    // POST - add new subscriber
router.get("/", getSubscribers);                   // GET - list all subscribers
router.post("/unsubscribe", unsubscribeNewsletter); // POST - unsubscribe

export default router;
