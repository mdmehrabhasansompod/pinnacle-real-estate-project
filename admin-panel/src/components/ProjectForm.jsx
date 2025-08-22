import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProjectForm = ({ onSubmit, editing }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "",
    imageFile: null,
    imagePreview: "",
  });

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || "",
        description: editing.description || "",
        price: editing.price || "",
        location: editing.location || "",
        type: editing.type || "",
        imageFile: null,
        imagePreview: editing.image || "",
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setForm((prev) => ({
        ...prev,
        imageFile: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price ? Number(form.price) : "");
    formData.append("location", form.location);
    formData.append("type", form.type);
    if (form.imageFile) formData.append("image", form.imageFile);

    onSubmit(formData);

    if (!editing) {
      setForm({
        title: "",
        description: "",
        price: "",
        location: "",
        type: "",
        imageFile: null,
        imagePreview: "",
      });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-6 p-6 border rounded-lg shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 max-w-lg mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
        whileFocus={{ scale: 1.02 }}
      />
      <motion.textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
        rows={4}
        required
        whileFocus={{ scale: 1.02 }}
      />
      <motion.input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <motion.input
        type="text"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <motion.select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
        whileFocus={{ scale: 1.02 }}
      >
        <option value="">Select Project Type</option>
        <option value="Residential Construction">Residential Construction</option>
        <option value="Commercial Construction">Commercial Construction</option>
        <option value="Property Management">Property Management</option>
        <option value="Development Services">Development Services</option>
      </motion.select>
      <motion.input
        type="file"
        name="image"
        onChange={handleChange}
        accept="image/*"
        className="mb-3 rounded border p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        whileHover={{ scale: 1.02 }}
      />
      {form.imagePreview && (
        <motion.img
          src={form.imagePreview}
          alt="Preview"
          className="w-32 h-32 object-cover mb-3 rounded border mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        />
      )}
      <motion.button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded w-full font-medium shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {editing ? "Update Project" : "Add Project"}
      </motion.button>
    </motion.form>
  );
};

export default ProjectForm;
