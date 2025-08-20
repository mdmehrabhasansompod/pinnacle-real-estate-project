import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    image: { type: String, required: true }, // store URL or image path
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const TeamMember = mongoose.model("TeamMember", teamSchema);


