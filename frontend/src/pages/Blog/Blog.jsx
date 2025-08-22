import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../../assets/frontend_assets/assets";
import LetsBuild from "../../components/Letsbuild/Letsbuild";
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

const Blog = () => {
  const [topNews, setTopNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [page, setPage] = useState(0);
  const [expandedTopNewsId, setExpandedTopNewsId] = useState(null);
  const [expandedLatestId, setExpandedLatestId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredLatest, setFilteredLatest] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);

  const categories = ["All", "Home Design", "Sustainability", "Renovation"];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/news`);
        const posts = response.data.slice(0, 6); // upper section: 6 news
        setTopNews(posts);
        setLatestNews(response.data);
        setFilteredLatest(response.data);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") setFilteredLatest(latestNews);
    else setFilteredLatest(latestNews.filter(post => post.category === activeCategory));
    setPage(0);
  }, [activeCategory, latestNews]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else setVisibleCount(2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(topNews.length / visibleCount);

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto text-white py-16 font-Gothic">

      {/* Upper Section: Latest News */}
      <div className="my-8 text-center lg:text-left">
        <motion.h1
          className="text-3xl md:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest News
        </motion.h1>
        <motion.p
          className="font-sans font-extralight max-w-2xl mx-auto lg:mx-0 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          At Pinnacle, we're passionate about sharing our knowledge and expertise.
        </motion.p>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: `-${page * (100 / visibleCount)}%` }} // dynamic translate
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {topNews.map(post => (
            <motion.div
              key={post._id}
              className={`flex-shrink-0 w-full sm:w-[calc(50%-12px)] bg-gray-900 rounded-xl shadow-xl p-4 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
            >
              <motion.img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <p className="border border-amber-50 px-3 py-1 w-fit text-sm mb-2">{post.category} | {post.date}</p>
              <h3 className="font-Gothic text-lg md:text-xl mb-2">{post.title}</h3>
              <p className="font-sans font-extralight text-sm flex-1">
                {expandedTopNewsId === post._id ? post.description : post.description.slice(0, 100) + "..."}
              </p>
              <motion.button
                onClick={() => setExpandedTopNewsId(expandedTopNewsId === post._id ? null : post._id)}
                className="mt-4 text-orange-400 hover:text-orange-500 underline text-sm text-left"
                whileTap={{ scale: 0.95 }}
              >
                {expandedTopNewsId === post._id ? "Show Less" : "Read More..."}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm font-light">{page + 1}/{totalPages}</p>
          <div className="flex gap-3">
            <motion.button
              onClick={() => page > 0 && setPage(page - 1)}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-30"
              disabled={page === 0}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={() => page < totalPages - 1 && setPage(page + 1)}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-30"
              disabled={page === totalPages - 1}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Lower Section: All News */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img src={assets.NewsVector} alt="Vector Icon" className="w-8 md:w-[35px]" />
            <h2 className="text-3xl md:text-4xl">All News</h2>
          </div>

          <div className="flex gap-4 flex-wrap">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 border border-white/30 rounded hover:bg-white/10 transition text-sm ${
                  activeCategory === cat ? "bg-white/10" : ""
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {filteredLatest.map(post => (
            <motion.div
              key={post._id}
              className="bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <p className="border border-amber-50 px-3 py-1 w-fit text-sm mb-2">{post.category} | {post.date}</p>
              <h3 className="font-Gothic text-lg md:text-xl mb-2">{post.title}</h3>
              <p className="font-sans font-extralight text-sm flex-1">
                {expandedLatestId === post._id ? post.description : post.description.slice(0, 100) + "..."}
              </p>
              <motion.button
                onClick={() => setExpandedLatestId(expandedLatestId === post._id ? null : post._id)}
                className="mt-4 text-orange-400 hover:text-orange-500 underline text-sm text-left"
                whileTap={{ scale: 0.95 }}
              >
                {expandedLatestId === post._id ? "Show Less" : "Read More..."}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <LetsBuild />
    </div>
  );
};

export default Blog;


