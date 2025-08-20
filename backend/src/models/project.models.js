import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    location: { type: String },
    image: { type: String }, // store image URL or file path
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
