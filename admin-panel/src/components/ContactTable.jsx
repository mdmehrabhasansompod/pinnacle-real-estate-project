import { motion } from "framer-motion";

const ContactTable = ({ contacts, onDelete }) => {
  if (!contacts) return null;

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full border-collapse border min-w-[700px]">
        <thead>
          <tr className="bg-gradient-to-r from-blue-400 to-blue-500 text-white uppercase tracking-wide text-sm">
            <th className="border p-3">Name</th>
            <th className="border p-3">Phone</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Budget</th>
            <th className="border p-3">Location</th>
            <th className="border p-3">Service</th>
            <th className="border p-3">Message</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <motion.tr
              key={c._id}
              className="hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.phone}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.budget}</td>
              <td className="border p-2">{c.location}</td>
              <td className="border p-2">{c.service}</td>
              <td className="border p-2 truncate max-w-xs" title={c.message}>
                {c.message}
              </td>
              <td className="border p-2 text-center">
                <motion.button
                  onClick={() => onDelete(c._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  whileHover={{ scale: 1.1 }}
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

export default ContactTable;


