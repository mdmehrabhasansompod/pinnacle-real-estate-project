import express from "express";
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
} from "../controllers/contact.controllers.js";

const router = express.Router();

// POST (frontend form submission)
router.post("/", createContact);

// GET all contacts (admin)
router.get("/", getContacts);

// GET single contact (optional)
router.get("/:id", getContactById);

// DELETE contact (admin)
router.delete("/:id", deleteContact);

export default router;
