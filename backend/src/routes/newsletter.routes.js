// routers/newsletter.routers.js
import express from "express";
import { subscribe, getAllEmails, deleteEmail, broadcastEmail,sendToOneSubscriber } from "../controllers/newsletter.controllers.js";

const router = express.Router();

// Public subscription (footer form)
router.post("/subscribe", subscribe);

// Admin routes
router.get("/", getAllEmails); // fetch all emails
router.delete("/:id", deleteEmail); // remove email
router.post("/broadcast", broadcastEmail); // send email to all subscribers
router.post("/send/:id", sendToOneSubscriber);


export default router;
