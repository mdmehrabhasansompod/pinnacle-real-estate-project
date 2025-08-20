import express from "express";
import { submitContactForm, getAllContacts, deleteContact } from "../controllers/contact.controllers.js";

const router = express.Router();

// POST: submit contact form
router.post("/", submitContactForm);

// GET: get all submitted contacts
router.get("/", getAllContacts);

// DELETE: delete contact by ID
router.delete("/:id", deleteContact);

export default router;
