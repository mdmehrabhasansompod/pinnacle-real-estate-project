// src/api/projectApi.js
import { baseApi } from "../constants.js";

export const fetchProjects = async () => {
  const res = await fetch(`${baseApi}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

export const createProject = async (formData) => {
  const res = await fetch(`${baseApi}/projects`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
};

export const updateProject = async (id, formData) => {
  const res = await fetch(`${baseApi}/projects/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${baseApi}/projects/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
};
