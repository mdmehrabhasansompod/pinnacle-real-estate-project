import {Service} from "../models/service.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

export const createService = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path,{ folder: "pinnacle-real-estate-app",});
      imageUrl = result.secure_url;
    }

    const service = new Service({ title, description, category, image: imageUrl });
    await service.save();

    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single service by ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    let imageUrl = req.body.image || "";

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path, {
        folder: "pinnacle-real-estate-app",}
);
      imageUrl = result.secure_url;
    }

    const updated = await Service.findByIdAndUpdate(
      id,
      { title, description, category, image: imageUrl },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Service not found" });

    res.json({ message: "Service updated", service: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Delete service by ID
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
