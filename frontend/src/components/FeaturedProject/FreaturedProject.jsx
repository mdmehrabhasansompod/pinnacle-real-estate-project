import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../../assets/frontend_assets/assets";
import axios from "axios";
import { API_BASE_URL } from "../../config/constants";

const ProjectsPreview = () => {
  const [projects, setProjects] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Fetch projects and slice latest 6
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/projects?sort=desc`);
        setProjects(res.data.slice(0, 6)); // <- only 6 latest
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };
    fetchProjects();
  }, []);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
      setPageIndex(0); // reset to first page on resize
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(projects.length / visibleCount);

  const nextPage = () => {
    if (pageIndex + 1 < totalPages) setPageIndex(pageIndex + 1);
  };

  const prevPage = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const currentProjects = projects.slice(
    pageIndex * visibleCount,
    pageIndex * visibleCount + visibleCount
  );

  return (
    <div className="w-[90%] lg:w-[80%] mx-auto text-white py-16 font-Gothic">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <img src={assets.projectvector} alt="Projects Vector" className="w-8 md:w-10" />
        <h1 className="text-3xl md:text-4xl">Featured Projects</h1>
      </div>

      <p className="font-sans font-extralight max-w-2xl mb-8">
        Discover our top projects, handpicked to showcase the quality and excellence we deliver in residential and commercial real estate.
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
            {currentProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-Gothic text-lg md:text-xl mb-2">{project.title}</h3>
                <p className="text-gray-400 mt-1 text-sm font-sans font-extralight line-clamp-2">
                  {project.description}
                </p>
                <p className="text-sm text-gray-400 mt-2 flex items-center">
                  <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                  {project.location}
                </p>
                <p className="text-sm text-gray-400 mt-1 flex items-center">
                  <FaDollarSign className="w-4 h-4 mr-1" />
                  {project.price}
                </p>
                <p className="mt-3 inline-block text-xs border border-white text-white px-2 py-[2px] rounded-full">
                  {project.type}
                </p>
                <button className="secondary-button !px-[80px] mt-5 mx-auto block">
                  View Property
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm font-light">
            {pageIndex * visibleCount + 1}–{Math.min((pageIndex + 1) * visibleCount, projects.length)} / {projects.length}
          </p>
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

export default ProjectsPreview;
