import axios from "axios";
import {baseApi} from "../constants.js"

const API_URL = `${baseApi}/team`;

// Fetch all
export const fetchTeams = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Create
export const createTeamMember = async (formData) => {
  const { data } = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Update
export const updateTeamMember = async ({ id, team }) => {
  const { data } = await axios.put(`${API_URL}/${id}`, team, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete
export const deleteTeamMember = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
