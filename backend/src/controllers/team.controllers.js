import {TeamMember} from "../models/team.models.js";

// ✅ Add new team member
export const createTeamMember = async (req, res) => {
  try {
    const { name, role, image, description } = req.body;

    if (!name || !role || !image || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const member = new TeamMember({ name, role, image, description });
    await member.save();

    res.status(201).json({ message: "Team member added", member });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all team members
export const getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single team member by ID
export const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await TeamMember.findById(id);

    if (!member) return res.status(404).json({ message: "Team member not found" });

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update team member by ID
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, image, description } = req.body;

    const updated = await TeamMember.findByIdAndUpdate(
      id,
      { name, role, image, description },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Team member not found" });

    res.json({ message: "Team member updated", member: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete team member by ID
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TeamMember.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Team member not found" });

    res.json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
