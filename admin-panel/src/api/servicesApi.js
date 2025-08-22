import axios from "axios";
import {baseApi} from "../constants.js"

const API_URL = `${baseApi}`;

export const fetchServices = async () => {
  const { data } = await axios.get(`${API_URL}/services`);
  return data;
};

// Create service
export const createService = async (formData) => {
  const { data } = await axios.post(`${API_URL}/services`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Update service
export const updateService = async ({ id, service }) => {
  const { data } = await axios.put(`${API_URL}/services/${id}`, service, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete service
export const deleteService = async (id) => {
  const { data } = await axios.delete(`${API_URL}/services/${id}`);
  return data;
};
