import React, { useState } from 'react';
import { blogsData, assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LatestNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < blogsData.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleNews = blogsData.slice(currentIndex, currentIndex + itemsPerPage);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="news-section w-[90%] max-w-[1200px] mx-auto py-16 mt-[100px] font-Gothic">
      {/* Header */}
      <div className="flex flex-wrap items-center mb-10 gap-4">
        <img src={assets.projectvector} alt="Vector Decoration" className="w-8 md:w-[35px]" />
        <h2 className="text-3xl md:text-4xl text-white flex-shrink-0">Latest News</h2>
      </div>

      {/* Description + See All */}
      <div className="flex flex-col md:flex-row justify-between mb-12 gap-6 items-start md:items-center">
        <p className="text-gray-400 font-sans max-w-full md:max-w-[600px]">
          Stay up-to-date with the latest news, insights, and expert advice from the Pinnacle team and the real estate industry.
        </p>
        <Link
          to="/news"
          className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition w-full md:w-auto text-center"
        >
          See All News
        </Link>
      </div>

     {/* Desktop Grid with Arrows */}
<div className="hidden md:flex items-center gap-4">
  <button
    onClick={handlePrev}
    disabled={currentIndex === 0}
    className="p-3 bg-white/20 text-white rounded-full hover:bg-white/40 disabled:opacity-40 transition"
  >
    <FaChevronLeft />
  </button>

  <div className="flex gap-6">
    {visibleNews.map((news, idx) => (
      <motion.div
        key={news.id}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={cardVariants}
        transition={{ delay: idx * 0.1, duration: 0.5 }}
        whileHover={{ scale: 1.03, boxShadow: '0 15px 25px rgba(255,255,255,0.1)' }}
        className="flex-shrink-0 w-[360px] max-w-[360px] flex flex-col p-4 border border-white/20 rounded-lg bg-black text-white"
      >
        <img
          src={news.image}
          alt={news.title}
          className="h-[180px] w-full object-cover rounded-md mb-4"
        />
        <h4 className="text-lg md:text-xl font-Gothic">{news.title}</h4>
        <p className="text-gray-300 mt-2 line-clamp-3 font-sans font-extralight flex-1">{news.excerpt}</p>
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/news/${news.id}`}
            className="text-orange-400 hover:text-orange-500 underline text-sm"
          >
            Read More...
          </Link>
          <p className="text-sm text-gray-400 font-sans">{news.date}</p>
        </div>
      </motion.div>
    ))}
  </div>

  <button
    onClick={handleNext}
    disabled={currentIndex + itemsPerPage >= blogsData.length}
    className="p-3 bg-white/20 text-white rounded-full hover:bg-white/40 disabled:opacity-40 transition"
  >
    <FaChevronRight />
  </button>
</div>


      {/* Mobile Horizontal Scroll */}
      <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth mt-4">
        {blogsData.map((news, idx) => (
          <motion.div
            key={news.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardVariants}
            transition={{ delay: idx * 0.05, duration: 0.5 }}
            whileHover={{ scale: 1.03, boxShadow: '0 15px 25px rgba(255,255,255,0.1)' }}
            className="snap-start flex-shrink-0 w-[280px] flex flex-col p-4 border border-white/20 rounded-lg bg-black text-white cursor-pointer"
          >
            <img
              src={news.image}
              alt={news.title}
              className="h-[180px] w-full object-cover rounded-md mb-4"
            />
            <h4 className="text-lg md:text-xl font-Gothic">{news.title}</h4>
            <p className="text-gray-300 mt-2 line-clamp-3 font-sans font-extralight flex-1">{news.excerpt}</p>
            <div className="mt-4 flex justify-between items-center">
              <Link
                to={`/news/${news.id}`}
                className="text-orange-400 hover:text-orange-500 underline text-sm"
              >
                Read More...
              </Link>
              <p className="text-sm text-gray-400 font-sans">{news.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;

