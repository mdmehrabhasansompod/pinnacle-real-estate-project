import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { blogsData, assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import LetsBuild from "../../components/Letsbuild/Letsbuild";

const Blog = () => {
  const topNews = blogsData.slice(0, 3);
  const latestNews = blogsData;

  const [sliderIndex, setSliderIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredLatest, setFilteredLatest] = useState(latestNews);
  const categories = ["All", "Home Design", "Sustainability", "Renovation"];

  // Responsive count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter Latest News
  useEffect(() => {
    if (activeCategory === "All") setFilteredLatest(latestNews);
    else setFilteredLatest(latestNews.filter((post) => post.category === activeCategory));
    setSliderIndex(0);
  }, [activeCategory]);

  const totalSlides = Math.max(topNews.length - visibleCount, 0);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto text-white py-16 font-Gothic">

      {/* Top News Slider */}
      <div className="my-8 text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl">Get the Latest News</h1>
        <p className="font-sans font-extralight max-w-2xl mx-auto lg:mx-0 mt-4">
          At Pinnacle, we're passionate about sharing our knowledge and expertise.
        </p>
      </div>

      <div className="overflow-hidden relative">
        <motion.div
          drag="x"
          dragConstraints={{ left: -((topNews.length - visibleCount) * 100), right: 0 }}
          className="flex gap-6 cursor-grab"
          animate={{ x: `-${(100 / visibleCount) * sliderIndex}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {topNews.map((post) => (
            <motion.div
              key={post.id}
              className="flex-shrink-0"
              style={{ width: `${100 / visibleCount}%` }}
              whileHover={{ scale: 1.03 }}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-900 rounded-xl shadow-lg p-4 h-full flex flex-col">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4"/>
                <p className="border border-amber-50 px-3 py-1 w-fit text-sm mb-2">{post.category} | {post.date}</p>
                <h3 className="font-Gothic text-lg md:text-xl mb-2">{post.title}</h3>
                <p className="font-sans font-extralight text-sm flex-1">{post.excerpt}</p>
                <Link to={`/news/${post.id}`} className="mt-4 text-orange-400 hover:text-orange-500 underline text-sm">Read More...</Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm font-light">{sliderIndex + 1}/{totalSlides + 1}</p>
          <div className="flex gap-3">
            <motion.button
              onClick={() => sliderIndex > 0 && setSliderIndex(sliderIndex - 1)}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={() => sliderIndex < totalSlides && setSliderIndex(sliderIndex + 1)}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img src={assets.NewsVector} alt="Vector Icon" className="w-8 md:w-[35px]"/>
            <h2 className="text-3xl md:text-4xl">Latest News</h2>
          </div>

          <div className="flex gap-4 flex-wrap">
            {categories.map((cat) => (
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
          {filteredLatest.map((post, idx) => (
            <motion.div
              key={post.id}
              className="bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4"/>
              <p className="border border-amber-50 px-3 py-1 w-fit text-sm mb-2">{post.category} | {post.date}</p>
              <h3 className="font-Gothic text-lg md:text-xl mb-2">{post.title}</h3>
              <p className="font-sans font-extralight text-sm flex-1">{post.excerpt}</p>
              <Link to={`/news/${post.id}`} className="mt-4 text-orange-400 hover:text-orange-500 underline text-sm">Read More...</Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <LetsBuild />
    </div>
  );
};

export default Blog;


