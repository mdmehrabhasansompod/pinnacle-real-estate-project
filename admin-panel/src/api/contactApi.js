import axios from "axios";
import {baseApi} from "../constants.js"

const API_URL = `${baseApi}/contacts`;

export const fetchContacts = async () => {
  const { data } = await axios.get(API_URL);
  return data; // Must return an array
};

export const createContact = async (contact) => {
  const { data } = await axios.post(API_URL, contact);
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
