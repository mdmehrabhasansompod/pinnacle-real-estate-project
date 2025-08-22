import { motion } from "framer-motion";

const ProjectTable = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gradient-to-r from-green-400 to-green-500 text-white uppercase text-sm tracking-wide">
          <tr>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Location</th>
            <th className="p-3 border">Type</th>
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <motion.tr
              key={proj._id}
              className="hover:bg-gray-50 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <td className="p-2 border">{proj.title}</td>
              <td className="p-2 border truncate max-w-xs" title={proj.description}>
                {proj.description}
              </td>
              <td className="p-2 border">{proj.price}</td>
              <td className="p-2 border">{proj.location}</td>
              <td className="p-2 border">{proj.type}</td>
              <td className="p-2 border">
                {proj.image ? (
                  <motion.img
                    src={proj.image}
                    alt={proj.title}
                    className="w-16 h-16 object-cover rounded"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <span className="text-gray-400">No image</span>
                )}
              </td>
              <td className="p-2 border flex space-x-2">
                <motion.button
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
                  onClick={() => onEdit(proj)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit
                </motion.button>
                <motion.button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  onClick={() => onDelete(proj._id)}
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

export default ProjectTable;
