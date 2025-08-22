import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../../assets/frontend_assets/assets";
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

const LatestNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/news`);
        setNewsData(response.data.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 3);
      setPageIndex(0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(newsData.length / visibleCount);
  const nextPage = () => setPageIndex((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setPageIndex((prev) => Math.max(prev - 1, 0));

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const currentNews = newsData.slice(pageIndex * visibleCount, (pageIndex + 1) * visibleCount);

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto text-white py-16 font-Gothic">
      <div className="flex items-center gap-4 mb-8">
        <img src={assets.NewsVector} alt="News Vector" className="w-8 md:w-10" />
        <h1 className="text-3xl md:text-4xl">Latest News</h1>
      </div>

      <p className="font-sans font-extralight max-w-2xl mb-8">
        Stay up-to-date with the latest news, insights, and expert advice from the Pinnacle team and the real estate industry.
      </p>

      {/* Carousel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageIndex}
            className="flex gap-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {currentNews.map((news) => {
              const isExpanded = expandedIds.includes(news._id);
              return (
                <motion.div
                  key={news._id}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                  className={`flex-shrink-0 w-full md:w-[calc(33.333%-16px)] bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="border border-amber-50 px-3 py-1 w-fit text-sm mb-2">
                    {news.category} | {news.date}
                  </p>
                  <h3 className="font-Gothic text-lg md:text-xl mb-2">{news.title}</h3>

                  {/* Animate height for description */}
                  <motion.div
                    animate={{ height: isExpanded ? "auto" : 24 }}
                    initial={{ height: 24 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans font-extralight text-sm leading-relaxed">
                      {news.description}
                    </p>
                  </motion.div>

                  {news.description.length > 50 && (
                    <button
                      onClick={() => toggleExpand(news._id)}
                      className="mt-2 text-orange-400 hover:text-orange-500 underline text-sm self-start"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm font-light">{pageIndex + 1}/{totalPages}</p>
          <div className="flex gap-3">
            <button
              onClick={prevPage}
              disabled={pageIndex === 0}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextPage}
              disabled={pageIndex >= totalPages - 1}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;






