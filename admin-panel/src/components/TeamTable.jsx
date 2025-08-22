import React from "react";
import { motion } from "framer-motion";

const TeamTable = ({ teams, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gradient-to-r from-green-400 to-green-500 text-white uppercase text-sm tracking-wide">
          <tr>
            <th className="px-4 py-3 border">Name</th>
            <th className="px-4 py-3 border">Position</th>
            <th className="px-4 py-3 border">Bio</th>
            <th className="px-4 py-3 border">Image</th>
            <th className="px-4 py-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <motion.tr
              key={team._id}
              className="hover:bg-gray-50 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <td className="px-4 py-2 border">{team.name}</td>
              <td className="px-4 py-2 border">{team.position}</td>
              <td className="px-4 py-2 border truncate max-w-xs" title={team.bio}>{team.bio}</td>
              <td className="px-4 py-2 border">
                {team.image ? (
                  <motion.img
                    src={team.image}
                    alt={team.name}
                    className="w-16 h-16 object-cover rounded"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <span className="text-gray-400">No image</span>
                )}
              </td>
              <td className="px-4 py-2 border flex space-x-2">
                <motion.button
                  onClick={() => onEdit(team)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit
                </motion.button>
                <motion.button
                  onClick={() => onDelete(team._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
