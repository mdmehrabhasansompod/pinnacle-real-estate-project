import React, { useState } from 'react';
import { assets, serviceCategories } from '../../assets/frontend_assets/assets';
import { motion, AnimatePresence } from 'framer-motion';

const ExploreService = () => {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
    hover: { scale: 1.03, boxShadow: '0 15px 25px rgba(255,255,255,0.1)', transition: { duration: 0.3 } },
  };

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
        {serviceCategories.map((cat, idx) => (
          <motion.button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory.category === cat.category
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-black text-gray-400 border border-gray-700 hover:bg-orange-100 hover:text-black'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {cat.category}
          </motion.button>
        ))}
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence initial={false}>
          {activeCategory.services.map((service, idx) => (
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
              <button className="mt-4 text-orange-400 cursor-pointer underline hover:text-orange-500 text-sm text-left">
                Learn More
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExploreService;



