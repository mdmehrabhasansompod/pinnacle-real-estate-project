import axios from "axios";
import {baseApi} from "../constants.js"

const API = `${baseApi}/newsletters`;

// 📩 Get all subscribers
export const getAllEmails = async () => {
  const res = await axios.get(`${API}/`);
  return res.data;
};

// 🗑 Delete subscriber
export const deleteEmail = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

// 📢 Broadcast to ALL subscribers
export const broadcastEmail = async (subject, message) => {
  const res = await axios.post(`${API}/broadcast`, { subject, message });
  return res.data;
};

// 📧 Send to ONE subscriber
export const sendToOneSubscriber = async (id, subject, message) => {
  const res = await axios.post(`${API}/send/${id}`, { subject, message });
  return res.data;
};
