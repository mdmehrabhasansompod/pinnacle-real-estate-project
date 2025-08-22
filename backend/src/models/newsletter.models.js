import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
}, { timestamps: true });  // ✅ this adds createdAt & updatedAt automatically

export const Newsletter = mongoose.model('Newsletter', newsletterSchema);
