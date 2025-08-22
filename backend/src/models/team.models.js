import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    bio: { type: String },
    image: { type: String }, // Cloudinary URL
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);

