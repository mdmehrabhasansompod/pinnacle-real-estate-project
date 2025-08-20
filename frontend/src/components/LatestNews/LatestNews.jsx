import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { blogsData, assets } from "../../assets/frontend_assets/assets"; // <- import assets
import { Link } from "react-router-dom";

const LatestNews = () => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  // Responsive visibleCount
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.max(blogsData.length - visibleCount, 0);

  const nextSlide = () => {
    if (index < totalSlides) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto text-white py-16 font-Gothic">
      {/* Header with vector */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={assets.NewsVector} // <-- your vector image
          alt="News Vector"
          className="w-8 md:w-10"
        />
        <h1 className="text-3xl md:text-4xl">Latest News</h1>
      </div>

      <p className="font-sans font-extralight max-w-2xl mb-8">
        Stay up-to-date with the latest news, insights, and expert advice from the Pinnacle team and the real estate industry.
      </p>

      {/* Slider */}
      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-6"
          style={{ width: `${(100 / visibleCount) * blogsData.length}%` }}
          animate={{ x: `-${(100 / blogsData.length) * index}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {blogsData.map((news) => (
            <motion.div
              key={news.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              className="flex-shrink-0"
              style={{ width: `${100 / blogsData.length}%` }}
            >
              <div className="bg-gray-900 rounded-xl shadow-lg p-4 h-full flex flex-col">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="border border-amber-50 px-3 py-1 w-fit text-sm mb-2">
                  {news.category} | {news.date}
                </p>
                <h3 className="font-Gothic text-lg md:text-xl mb-2">{news.title}</h3>
                <p className="font-sans font-extralight text-sm leading-relaxed flex-1">
                  {news.excerpt}
                </p>
                <Link
                  to={`/news/${news.id}`}
                  className="mt-4 text-orange-400 hover:text-orange-500 underline text-sm"
                >
                  Read More...
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm font-light">{index + 1}/{totalSlides + 1}</p>
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              disabled={index === 0}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={index >= totalSlides}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Scroll */}
      <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth mt-6">
        {blogsData.map((news) => (
          <motion.div
            key={news.id}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={cardVariants}
            className="snap-start flex-shrink-0 w-[280px] flex flex-col p-4 border border-white/20 rounded-lg bg-black text-white cursor-pointer"
          >
            <img
              src={news.image}
              alt={news.title}
              className="h-[180px] w-full object-cover rounded-md mb-4"
            />
            <p className="border border-amber-50 px-3 py-1 w-fit text-sm mb-2">
              {news.category} | {news.date}
            </p>
            <h3 className="font-Gothic text-lg md:text-xl mb-2">{news.title}</h3>
            <p className="font-sans font-extralight text-sm leading-relaxed flex-1">
              {news.excerpt}
            </p>
            <Link
              to={`/news/${news.id}`}
              className="mt-4 text-orange-400 hover:text-orange-500 underline text-sm"
            >
              Read More...
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
