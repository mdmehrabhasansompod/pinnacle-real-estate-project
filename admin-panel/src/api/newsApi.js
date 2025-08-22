import axios from "axios";
import {baseApi} from "../constants.js"

const API_URL = `${baseApi}/news`;

// ✅ Fetch all news
export const fetchNews = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// ✅ Create news
export const createNews = async (formData) => {
  const { data } = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// ✅ Update news
export const updateNews = async ({ id, news }) => {
  const { data } = await axios.put(`${API_URL}/${id}`, news, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// ✅ Delete news
export const deleteNews = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
