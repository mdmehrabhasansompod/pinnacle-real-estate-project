import { Newsletter } from "../models/newsletter.models.js";

// Subscribe
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const subscription = new Newsletter({ email });
    await subscription.save();

    res.status(201).json({ message: "Subscribed successfully", subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Unsubscribe (POST method)
export const unsubscribeNewsletter = async (req, res) => {
  try {

    const { email } = req.body || {};

 
    if (!email) {
      return res.status(400).json({ message: "Email is required to unsubscribe" });
    }

    const deleted = await Newsletter.findOneAndDelete({ email });

    if (!deleted) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json({ message: "Unsubscribed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
