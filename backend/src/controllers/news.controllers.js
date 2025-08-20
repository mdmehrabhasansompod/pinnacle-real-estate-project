import {News} from "../models/news.models.js";

// ✅ Create news
export const createNews = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;

    if (!title || !description || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const news = new News({ title, description, image, category });
    await news.save();

    res.status(201).json({ message: "News created", news });
  } catch (err) {
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

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update news
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, category } = req.body;

    const updated = await News.findByIdAndUpdate(
      id,
      { title, description, image, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "News not found" });
    }

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
    if (!deleted) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
