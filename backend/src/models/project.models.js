import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required:true,
    },
    price: {
      type: Number,
      required:true,
    },
    location: {
      type: String,
      trim: true,
      required:true,
    },
    image: {
      type: String, // store image URL or file path
    },
    type: {
      type: String,
      enum: [
        "Residential Construction",
        "Commercial Construction",
        "Property Management",
        "Development Services",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);

