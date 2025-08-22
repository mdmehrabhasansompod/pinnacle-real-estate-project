import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NewsForm = ({ onSubmit, editing }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null); // File object
  const [imagePreview, setImagePreview] = useState(""); // Preview URL

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description);
      setCategory(editing.category);
      setImagePreview(editing.image || ""); // existing image URL
      setImageFile(null); // reset file input
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

    onSubmit({ title, description, category, image: imageFile });

    setTitle("");
    setDescription("");
    setCategory("");
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-6 p-6 border rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg max-w-lg mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.input
        type="text"
        placeholder="Title"
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        whileFocus={{ scale: 1.02 }}
      />

      <motion.textarea
        placeholder="Description"
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4}
        whileFocus={{ scale: 1.02 }}
      />

      <motion.input
        type="text"
        placeholder="Category"
        className="border p-3 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-full font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {editing ? "Update" : "Add"} News
      </motion.button>
    </motion.form>
  );
};

export default NewsForm;
