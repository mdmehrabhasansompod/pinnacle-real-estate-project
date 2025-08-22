import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdDashboard,
  MdBuild,
  MdArticle,
  MdBusiness,
  MdGroup,
  MdContacts,
  MdEmail,
} from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/", icon: <MdDashboard size={20} /> },
    { name: "Services", path: "/services", icon: <MdBuild size={20} /> },
    { name: "News", path: "/news", icon: <MdArticle size={20} /> },
    { name: "Projects", path: "/projects", icon: <MdBusiness size={20} /> },
    { name: "Team", path: "/team", icon: <MdGroup size={20} /> },
    { name: "Contacts", path: "/contacts", icon: <MdContacts size={20} /> },
    { name: "Newsletters", path: "/newsletters", icon: <MdEmail size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-black text-white p-6 flex flex-col">
      {/* Admin Panel as a clickable link */}
      <Link
        to="/"
        className="text-2xl font-bold mb-8 hover:text-gray-400 transition-colors"
      >
        Admin Panel
      </Link>

      <ul className="flex-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <motion.li
              key={link.name}
              className="mb-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <Link
                to={link.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white font-semibold"
                    : "hover:bg-gray-800 hover:text-gray-300"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

