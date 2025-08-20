import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    budget: { type: String, default: "" },
    location: { type: String, default: "" },
    service: { type: String, default: "" },
    message: { type: String, default: "" },
    terms: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);

