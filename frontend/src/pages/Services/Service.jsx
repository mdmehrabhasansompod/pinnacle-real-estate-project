import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import LetsBuild from "../../components/Letsbuild/Letsbuild";
import ContactForm from "../../components/contactForm/contactForm";
import axios from "axios";
import { API_BASE_URL } from "../../config/constants.js";

const Service = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.05, y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.2)" },
  };

  const buttonHover = { scale: 1.05, transition: { type: "spring", stiffness: 300 } };

  // Fetch all services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/services`);
        setServices(res.data);

        // Group by categories
        const grouped = [
          "Residential Construction",
          "Commercial Construction",
          "Property Management",
          "Development Services",
        ].map((category) => ({
          category,
          items: res.data.filter((service) => service.category === category),
        }));

        setCategories(grouped);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="text-white">

      {/* Intro Section */}
      <motion.div
        className="max-w-6xl mx-auto py-16 px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h3
          className="text-3xl sm:text-4xl md:text-5xl font-Gothic w-full md:w-2/5"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Bringing Your Vision to Life
        </motion.h3>
        <motion.p
          className="w-full md:w-3/5 font-sans font-extralight text-gray-300 text-sm sm:text-base md:text-lg mt-4 md:mt-0"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Pinnacle's commitment to excellence extends beyond just constructing buildings — it's about crafting exceptional spaces that inspire and delight.
        </motion.p>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        className="max-w-6xl mx-auto my-16 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={assets.serviceHero}
          alt="Service Hero"
          className="w-full h-auto rounded-xl shadow-2xl object-cover"
        />
      </motion.div>

      {/* Categories & Services */}
      {categories.map((category) => (
        <motion.div
          key={category.category}
          id={category.category.replace(/\s+/g, "-").toLowerCase()}
          className="max-w-6xl mx-auto py-16 px-4 sm:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-Gothic mb-12 text-center md:text-left"
            variants={containerVariants}
          >
            {category.category}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {category.items.map((service) => (
              <motion.div
                key={service.title}
                className="flex flex-col bg-gray-900/40 backdrop-blur-xl rounded-2xl overflow-hidden cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="w-full h-56 relative">
                  <img
                    src={service.image || assets.service1}
                    alt={service.title}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center">{service.title}</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between h-full">
                  {/* Full description */}
                  <p className="font-sans text-gray-300 text-sm sm:text-base md:text-lg mb-7">
                    {service.description}
                  </p>
                  <motion.div whileHover={buttonHover}>
                    <Link
                      to="/contact##contactForm"
                      className="secondary-button mt-auto self-start w-full sm:w-auto text-center"
                    >
                      Schedule a Call
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Contact Form */}
      <motion.div
        className="max-w-6xl mx-auto py-20 px-4 sm:px-6 bg-gray-900/30 backdrop-blur-lg rounded-2xl my-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        id="contact"
      >
        <ContactForm />
      </motion.div>

      {/* LetsBuild Section */}
      <motion.div
        className="max-w-6xl mx-auto py-16 px-4 sm:px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <LetsBuild />
      </motion.div>
    </div>
  );
};

export default Service;
