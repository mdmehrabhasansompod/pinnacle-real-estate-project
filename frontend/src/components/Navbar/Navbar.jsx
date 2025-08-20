import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = {
    Home: "/",
    "About Us": "/about",
    Projects: "/projects",
    Services: "/services",
    News: "/news",
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -30, pointerEvents: "none" },
    visible: { opacity: 1, y: 0, pointerEvents: "auto" },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 100 },
    }),
  };

  const isActive = (path) => location.pathname === path;

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileMenuOpen]);

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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/contact"
            className="hidden lg:flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Contact us
          </Link>
        </motion.div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden z-50">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden absolute top-[104px] left-0 w-full bg-black shadow-lg"
          >
            <nav className="flex flex-col gap-2 px-6 py-6">
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
                    className={`block px-4 py-3 rounded-md text-lg transition duration-300 ${
                      isActive(navLinks[item])
                        ? "bg-[rgb(44,44,44)] text-white"
                        : "text-gray-400 hover:bg-[rgb(64,64,64)] hover:text-white"
                    }`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Contact Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
                >
                  Contact us
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
