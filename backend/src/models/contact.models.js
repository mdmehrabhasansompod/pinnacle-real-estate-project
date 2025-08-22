import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    budget: { type: String },
    location: { type: String },
    service: { type: String },
    message: { type: String },
    terms: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
