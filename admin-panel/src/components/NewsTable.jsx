import React from "react";
import { motion } from "framer-motion";

const NewsTable = ({ news, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gradient-to-r from-green-400 to-green-600 text-white uppercase tracking-wide text-sm">
            <th className="px-6 py-3 border">Title</th>
            <th className="px-6 py-3 border">Description</th>
            <th className="px-6 py-3 border">Category</th>
            <th className="px-6 py-3 border">Image</th>
            <th className="px-6 py-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <motion.tr
              key={item._id}
              className="hover:bg-gray-50 cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <td className="px-6 py-3 border font-medium">{item.title}</td>
              <td className="px-6 py-3 border truncate max-w-xs" title={item.description}>
                {item.description}
              </td>
              <td className="px-6 py-3 border">{item.category}</td>
              <td className="px-6 py-3 border">
                {item.image ? (
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <span className="text-gray-400">No image</span>
                )}
              </td>
              <td className="px-6 py-3 border flex gap-3 justify-center">
                <motion.button
                  onClick={() => onEdit(item)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit
                </motion.button>
                <motion.button
                  onClick={() => onDelete(item._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete
                </motion.button>
              </td>
            </motion.tr>
          ))}
          {news.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No news available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable;
