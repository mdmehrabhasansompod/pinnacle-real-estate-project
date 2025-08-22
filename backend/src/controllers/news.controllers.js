import { News } from "../models/news.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

// ✅ Create news
export const createNews = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path, {
        folder: "pinnacle-real-estate-app",
      });
      imageUrl = result.secure_url;
    }

    const news = new News({ title, description, category, image: imageUrl });
    await news.save();

    res.status(201).json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all news
export const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single news by ID
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);

    if (!news) return res.status(404).json({ message: "News not found" });

    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update news
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    let imageUrl = req.body.image || "";

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path, {
        folder: "pinnacle-real-estate-app",
      });
      imageUrl = result.secure_url;
    }

    const updated = await News.findByIdAndUpdate(
      id,
      { title, description, category, image: imageUrl },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "News not found" });

    res.json({ message: "News updated", news: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete news
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await News.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "News not found" });

    // Delete from Cloudinary if image exists
    if (deleted.image) {
      const publicId = deleted.image.split("/").pop().split(".")[0];
      await deleteFromCloudinary(publicId);
    }

    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
