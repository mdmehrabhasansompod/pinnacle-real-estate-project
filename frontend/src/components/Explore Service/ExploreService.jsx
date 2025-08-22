import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../../config/constants';
import { useNavigate } from 'react-router-dom';

const ExploreService = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate(); // For redirection

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
    hover: {
      scale: 1.03,
      boxShadow: '0 15px 25px rgba(255,255,255,0.1)',
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/services`);
        setServices(response.data);

        const uniqueCategories = [...new Set(response.data.map(s => s.category))];
        setCategories(uniqueCategories);

        if (uniqueCategories.length > 0) setActiveCategory(uniqueCategories[0]);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  if (!activeCategory) return null;

  const filteredServices = services.filter(s => s.category === activeCategory);

  return (
    <div className="w-[90%] max-w-[1312px] mx-auto py-16 font-Gothic">

      {/* Header Section */}
      <div className="flex flex-col justify-center items-center gap-6 text-center mb-12 px-4 md:px-0">
        <h2 className="text-3xl md:text-4xl text-white font-semibold flex flex-wrap justify-center items-center gap-2">
          Quality service you get
          <img src={assets.servicevector} alt="" className="w-8 md:w-10" />
        </h2>
        <p className="text-gray-400 font-sans max-w-[750px] text-sm md:text-base">
          At Pinnacle, we offer a wide range of services to cater to your unique needs. From residential construction to commercial development, we've got you covered.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat, idx) => (
          <motion.button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-black text-gray-400 border border-gray-700 hover:bg-orange-100 hover:text-black'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence initial={false}>
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              className="bg-[#121212] border border-white/20 rounded-xl p-5 flex flex-col justify-between text-white cursor-pointer hover:shadow-lg hover:border-white/40 transition-all duration-300"
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
              whileHover="hover"
            >
              <div className="overflow-hidden rounded-xl">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <h4 className="text-lg font-semibold">{service.title}</h4>
                <p className="text-gray-400 text-sm mt-2 font-sans font-extralight line-clamp-3">{service.description}</p>
              </div>
              <button
                onClick={() => navigate('/contact#contactForm')}
                className="mt-4 secondary-button text-white font-semibold py-2 px-4 rounded text-sm transition-colors"
              >
                Schedule a Call
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExploreService;


