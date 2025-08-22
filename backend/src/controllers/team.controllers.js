import { Team } from "../models/team.models.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

// ✅ Create team member
export const createTeam = async (req, res) => {
  try {
    const { name, position, bio } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path, {
        folder: "pinnacle-real-estate-app",
      });
      imageUrl = result.secure_url;
    }

    const team = new Team({ name, position, bio, image: imageUrl });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all team members
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single team member
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team member not found" });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update team member
export const updateTeam = async (req, res) => {
  try {
    const { name, position, bio } = req.body;
    let imageUrl = req.body.image || "";

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path, {
        folder: "pinnacle-real-estate-app",
      });
      imageUrl = result.secure_url;
    }

    const updated = await Team.findByIdAndUpdate(
      req.params.id,
      { name, position, bio, image: imageUrl },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Team member not found" });
    res.json({ message: "Team member updated", team: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete team member
export const deleteTeam = async (req, res) => {
  try {
    const deleted = await Team.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Team member not found" });

    if (deleted.image) {
      const publicId = deleted.image.split("/").pop().split(".")[0];
      await deleteFromCloudinary(publicId);
    }

    res.json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
