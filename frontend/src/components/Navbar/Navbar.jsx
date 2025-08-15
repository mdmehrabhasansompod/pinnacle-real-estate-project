import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation(); // Get current route
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = {
    Home: "/",
    "About Us": "/about",
    Projects: "/projects",
    Services: "/services",
    News: "/news",
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, pointerEvents: "none" },
    visible: { opacity: 1, y: 0, pointerEvents: "auto" },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } }),
  };

  // Function to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-black text-gray-200 relative z-50">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 h-[104px]">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-[29px] w-[138px]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 font-sans ml-10">
          {Object.keys(navLinks).map((item) => (
            <Link
              key={item}
              to={navLinks[item]}
              className={`px-4 py-2 rounded-md transition duration-300 ${
                isActive(navLinks[item])
                  ? "bg-[rgb(44,44,44)] text-white"
                  : "text-gray-400 hover:bg-[rgb(64,64,64)] hover:text-white"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop Contact Button */}
        <button className="primary-button hidden lg:block">Contact us</button>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden z-50">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-[104px] left-0 w-full bg-black shadow-md"
          >
            <nav className="flex flex-col gap-2 px-6 py-4">
              {Object.keys(navLinks).map((item, index) => (
                <motion.div
                  key={item}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={linkVariants}
                >
                  <Link
                    to={navLinks[item]}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-md transition duration-300 ${
                      isActive(navLinks[item])
                        ? "bg-[rgb(44,44,44)] text-white"
                        : "text-gray-400 hover:bg-[rgb(64,64,64)] hover:text-white"
                    }`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.5 } }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button className="primary-button mt-4 w-full">Contact us</button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
