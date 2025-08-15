import React, { useState } from 'react';
import { assets, serviceCategories } from '../../assets/frontend_assets/assets';

const ExploreService = () => {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]);

  return (
    <div className="w-[90%] max-w-[1312px] mx-auto py-12 font-Gothic">

      {/* Header Section */}
      <div className="flex flex-col justify-center items-center gap-8 text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-white font-semibold flex flex-wrap justify-center items-center">
          Quality service you get
          <img src={assets.servicevector} alt="" className="w-8 md:w-10 ml-3" />
        </h2>
        <p className="text-gray-400 font-sans w-full max-w-[750px] text-sm md:text-base">
          At Pinnacle, we offer a wide range of services to cater to your unique needs. From residential construction to commercial development, we've got you covered.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {serviceCategories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm cursor-pointer font-medium transition ${
              activeCategory.category === cat.category
                ? 'bg-orange-500 text-white'
                : 'text-gray-600 border-gray-300 hover:bg-orange-100'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Services Container */}
      <div className="grid grid-flow-col md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible pb-4">
        {activeCategory.services.map((service) => (
          <div
            key={service.id}
            className="min-w-[280px] md:min-w-0 bg-[#121212] border border-white/20 rounded-lg p-4 flex flex-col justify-between hover:border-white/40 transition duration-300 font-sans text-white"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-[160px] object-cover rounded"
            />
            <div className="mt-3 flex-1">
              <h4 className="text-md font-semibold">{service.title}</h4>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">{service.description}</p>
            </div>
            <button className="mt-4 text-orange-400 cursor-pointer underline hover:text-orange-500 text-sm text-left">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreService;
