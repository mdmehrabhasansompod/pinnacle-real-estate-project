import {Service} from "../models/service.models.js";

// ✅ Create new service
export const createService = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;

    if (!title || !description || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newService = new Service({ title, description, image, category });
    await newService.save();

    res.status(201).json({ message: "Service created", service: newService });
  } catch (err) {
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

// ✅ Update service by ID
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, category } = req.body;

    const updated = await Service.findByIdAndUpdate(
      id,
      { title, description, image, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Service not found" });
    }

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
