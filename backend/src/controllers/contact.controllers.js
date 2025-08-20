import {Contact} from "../models/contact.models.js";

// ✅ Submit a contact form
export const submitContactForm = async (req, res) => {
  try {
    const { name, phone, email, budget, location, service, message, terms } = req.body;

    // Required fields check
    if (!name || !phone || !email || terms !== true) {
      return res.status(400).json({ message: "Name, phone, email, and terms acceptance are required" });
    }

    const contact = new Contact({ name, phone, email, budget, location, service, message, terms });
    await contact.save();

    res.status(201).json({ message: "Form submitted successfully", contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all submitted contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete a contact submission by ID
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });

    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
