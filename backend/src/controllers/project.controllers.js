import { Project } from "../models/project.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get single project
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Project ID required" });
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Create project
export const createProject = async (req, res) => {
  try {
    const { title, description, price, location, type } = req.body;

    if (!title || !type) return res.status(400).json({ message: "Title and type required" });

    let imageUrl = "";
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      imageUrl = result?.secure_url || "";
    }

    const project = new Project({
      title,
      description,
      price: price ? Number(price) : undefined,
      location,
      type,
      image: imageUrl,
    });

    await project.save();
    res.status(201).json({ message: "Project created", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Project ID is required" });

    // multer ensures req.body exists
    const body = req.body || {};
    const { title, description, price, location, type } = body;

    if (!title || !type) {
      return res.status(400).json({ message: "Title and Type are required" });
    }

    let imageUrl = body.image || "";
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path, {
        folder: "pinnacle-real-estate-app",
      });
      imageUrl = result.secure_url;
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price: price ? Number(price) : undefined,
        location,
        type,
        image: imageUrl,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project updated", project: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Project ID required" });

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });

    if (deleted.image) {
      const publicId = deleted.image.split("/").pop().split(".")[0];
      await deleteFromCloudinary(publicId);
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
