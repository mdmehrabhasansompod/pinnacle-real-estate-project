import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ServiceForm = ({ onSubmit, editing }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description);
      setCategory(editing.category);
      setImagePreview(editing.image || "");
      setImageFile(null);
    }
  }, [editing]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(editing?.image || "");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, category, imageFile });

    setTitle("");
    setDescription("");
    setCategory("");
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-6 p-6 border rounded-lg shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 max-w-md mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.input
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        whileFocus={{ scale: 1.02 }}
      />
      <motion.input
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        whileFocus={{ scale: 1.02 }}
      />
      <motion.input
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
        whileFocus={{ scale: 1.02 }}
      />
      <motion.input
        type="file"
        accept="image/*"
        className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        onChange={handleFileChange}
        whileHover={{ scale: 1.02 }}
      />
      {imagePreview && (
        <motion.img
          src={imagePreview}
          alt="Preview"
          className="w-32 h-32 object-cover mb-3 rounded border mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        />
      )}
      <motion.button
        className="bg-blue-500 text-white px-6 py-2 rounded w-full font-medium shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {editing ? "Update" : "Add"} Service
      </motion.button>
    </motion.form>
  );
};

export default ServiceForm;

