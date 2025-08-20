import {Newsletter} from "../models/newsletter.models.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Newsletter.findOne({ email });
    if(existing) return res.status(400).json({ message: "Already subscribed" });

    const subscription = await Newsletter.create({ email });
    res.status(201).json({ message: "Subscribed successfully", subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
