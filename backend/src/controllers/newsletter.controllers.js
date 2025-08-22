// controllers/newsletter.controllers.js
import { Newsletter } from "../models/newsletter.models.js";
import nodemailer from "nodemailer";

// Subscribe (footer input)
export const subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(400).json({ message: "Already subscribed" });

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: get all emails
export const getAllEmails = async (req, res) => {
  try {
    const emails = await Newsletter.find().sort({ createdAt: -1 });
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: delete email
export const deleteEmail = async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: broadcast email (send individually to each subscriber, in parallel)
export const broadcastEmail = async (req, res) => {
  const { subject, message } = req.body;
  try {
    const subscribers = await Newsletter.find();
    if (!subscribers.length) {
      return res.status(400).json({ message: "No subscribers found" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Prepare all email promises
    const emailPromises = subscribers.map((sub) =>
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: sub.email,
        subject,
        text: message
      })
    );

    // Send in parallel
    await Promise.all(emailPromises);

    res.json({ message: `Emails sent successfully to ${subscribers.length} subscribers` });
  } catch (err) {
    console.error("Broadcast error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Send email to one subscriber
export const sendToOneSubscriber = async (req, res) => {
  const { id } = req.params;
  const { subject, message } = req.body;

  try {
    const subscriber = await Newsletter.findById(id);
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: subscriber.email,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: `Email sent to ${subscriber.email}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
