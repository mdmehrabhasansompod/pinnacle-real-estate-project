import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    image: { type: String, required: true }, // URL stored
  },
  { timestamps: true }
);

export const News = mongoose.model("News", newsSchema);
