import React, { useState } from 'react';
import { blogsData, assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';

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

  return (
    <div className="news-section w-[90%] max-w-[1200px] mx-auto py-16 mt-[100px] relative font-Gothic">
      
      {/* Title + vector */}
      <div className="flex flex-wrap items-center mb-10 gap-4">
        <img src={assets.projectvector} alt="Vector Decoration" className="w-8 md:w-[35px]" />
        <h2 className="text-3xl md:text-4xl text-white flex-shrink-0">
          Latest News
        </h2>
      </div>

      {/* Description + See All */}
      <div className="flex flex-col md:flex-row justify-between mb-12 gap-6">
        <p className="text-gray-400 font-sans max-w-full md:max-w-[600px]">
          Stay up-to-date with the latest news, insights, and expert advice from the Pinnacle team and the real estate industry.
        </p>
        <Link
          to="/news"
          className="self-start md:self-center px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition w-full md:w-auto text-center"
        >
          See All News
        </Link>
      </div>

      {/* News cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-transform duration-700 ease-in-out">
        {visibleNews.map((news) => (
          <div
            key={news.id}
            className="p-4 border border-white/20 rounded-lg bg-black text-white transition-transform duration-500 ease-in-out hover:scale-[1.02]"
          >
            <img
              src={news.image}
              alt={news.title}
              className="h-[180px] w-full object-cover rounded"
            />
            <h4 className="text-lg md:text-xl font-Gothic mt-4">{news.title}</h4>
            <p className="text-gray-300 mt-2 line-clamp-2 font-sans">{news.excerpt}</p>
            <button
              className="mt-1 text-orange-400 hover:text-orange-500 underline bg-transparent border-none cursor-pointer font-sans"
              aria-label={`Read more about ${news.title}`}
            >
              Read More...
            </button>
            <p className="text-sm text-gray-400 mt-2 font-sans">{news.date}</p>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 px-2 sm:px-4 absolute bottom-4 left-0 right-0 gap-4 sm:gap-0">
        
        {/* Bottom-left: News count */}
        <p className="text-sm text-gray-400 font-sans text-center sm:text-left">
          Showing {Math.min(currentIndex + 1, blogsData.length)}–
          {Math.min(currentIndex + itemsPerPage, blogsData.length)} of {blogsData.length} News
        </p>

        {/* Bottom-right: Next/Prev buttons */}
        <div className="flex gap-4 justify-center sm:justify-end w-full sm:w-auto">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 border cursor-pointer font-Gothic bg-amber-50 rounded disabled:opacity-40 hover:bg-gray-100 transition"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= blogsData.length}
            className="px-4 py-2 border cursor-pointer font-Gothic bg-amber-50 rounded disabled:opacity-40 hover:bg-gray-100 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
