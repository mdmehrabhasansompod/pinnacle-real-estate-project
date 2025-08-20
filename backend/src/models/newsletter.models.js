import mongoose from "mongoose";

const newsletterSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Newsletter = mongoose.model("Newsletter", newsletterSchema);
