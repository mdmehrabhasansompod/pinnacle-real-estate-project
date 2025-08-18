import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaBuilding, FaDollarSign, FaSearch, FaTimes } from "react-icons/fa";
import { assets } from "../../assets/frontend_assets/assets";
import LetsBuild from "../../components/Letsbuild/Letsbuild";

const projectsData = [
  { id: 1, title: "Luxury Villa", description: "Spacious villa with modern design and swimming pool.", image: assets.project1, location: "New York", type: "Villa", cost: "$500,000", speciality: "Premium" },
  { id: 2, title: "City Apartment", description: "Modern apartment in the city center.", image: assets.project2, location: "Los Angeles", type: "Apartment", cost: "$200,000", speciality: "Affordable" },
  { id: 3, title: "Beach House", description: "A peaceful beachside property.", image: assets.project3, location: "Miami", type: "House", cost: "$300,000", speciality: "Holiday" },
  { id: 4, title: "Office Tower", description: "Commercial office space for enterprises.", image: assets.project4, location: "Chicago", type: "Office", cost: "$1,000,000", speciality: "Commercial" },
  { id: 5, title: "Lake View House", description: "Beautiful house overlooking the lake.", image: assets.project5, location: "San Francisco", type: "House", cost: "$350,000", speciality: "Scenic" },
  { id: 6, title: "Penthouse Suite", description: "Luxury penthouse with skyline views.", image: assets.project6, location: "Seattle", type: "Apartment", cost: "$750,000", speciality: "Luxury" },
  { id: 7, title: "Suburban Villa", description: "Modern villa in peaceful suburbs.", image: assets.project6, location: "Dallas", type: "Villa", cost: "$450,000", speciality: "Family" },
];

const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -30 } };

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ location: "", type: "", cost: "" });
  const [tempFilters, setTempFilters] = useState({ location: "", type: "", cost: "" });

  const handleToggleProjects = () => setShowAll(!showAll);
  const handleSearchChange = (e) => setSearchText(e.target.value);

  const handleClearFilters = () => {
    setSearchText("");
    setTempFilters({ location: "", type: "", cost: "" });
    setAppliedFilters({ location: "", type: "", cost: "" });
    setShowAll(false);
  };

  const handleFindProperty = () => {
    setAppliedFilters({ ...tempFilters });
    setShowAll(true);
  };

  const getFilteredProjects = () => {
    return projectsData.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchText.toLowerCase()) ||
        p.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesLocation = appliedFilters.location === "" || p.location === appliedFilters.location;
      const matchesType = appliedFilters.type === "" || p.type === appliedFilters.type;
      const matchesCost = appliedFilters.cost === "" || p.cost === appliedFilters.cost;
      return matchesSearch && matchesLocation && matchesType && matchesCost;
    });
  };

  const displayedProjects = showAll ? getFilteredProjects() : getFilteredProjects().slice(0, 6);

  return (
    <div className="w-full text-white flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative w-[90%] sm:w-[85%] md:w-[80%] h-[300px] sm:h-[350px] md:h-[450px] mx-auto">
        <img src={assets.projectPageHeader} alt="Hero" className="w-full h-full object-cover rounded-lg" />

        {/* Project Name Overlays - always visible */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute top-4 left-4 rotate-[-5deg] bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg shadow text-xs sm:text-sm md:text-base"
        >
          Luxury Villa
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: -40 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/3 rotate-[8deg] bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg shadow text-xs sm:text-sm md:text-base"
        >
          City Apartment
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute top-8 right-4 rotate-[-10deg] bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg shadow text-xs sm:text-sm md:text-base"
        >
          Beach House
        </motion.div>
      </div>

      {/* Search Bar - move below hero on mobile */}
      <div className="w-[90%] sm:w-[85%] md:w-[80%] mt-6 md:mt-[-40px] bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <div className="grid md:grid-cols-5 gap-4 items-center">
          {/* Search */}
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-lg px-3 relative">
            <FaSearch className="mr-2 text-gray-300" />
            <input
              type="text"
              placeholder="Search Property"
              value={searchText}
              onChange={handleSearchChange}
              className="bg-transparent outline-none w-full text-white p-2 placeholder-gray-400"
            />
            {searchText && (
              <FaTimes
                className="ml-2 cursor-pointer text-gray-300 absolute right-3"
                onClick={handleClearFilters}
              />
            )}
          </div>

          {/* Location Filter */}
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-lg px-3 relative">
            <FaMapMarkerAlt className="mr-2 text-gray-300" />
            <select
              className="bg-black text-white w-full p-2 rounded-lg focus:outline-none"
              value={tempFilters.location}
              onChange={(e) => setTempFilters({ ...tempFilters, location: e.target.value })}
            >
              <option value="">Location</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Miami</option>
              <option>Chicago</option>
              <option>San Francisco</option>
              <option>Seattle</option>
              <option>Dallas</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-lg px-3 relative">
            <FaBuilding className="mr-2 text-gray-300" />
            <select
              className="bg-black text-white w-full p-2 rounded-lg focus:outline-none"
              value={tempFilters.type}
              onChange={(e) => setTempFilters({ ...tempFilters, type: e.target.value })}
            >
              <option value="">Type</option>
              <option>Villa</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Office</option>
            </select>
          </div>

          {/* Cost Filter */}
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-lg px-3 relative">
            <FaDollarSign className="mr-2 text-gray-300" />
            <select
              className="bg-black text-white w-full p-2 rounded-lg focus:outline-none"
              value={tempFilters.cost}
              onChange={(e) => setTempFilters({ ...tempFilters, cost: e.target.value })}
            >
              <option value="">Max Cost</option>
              <option>$200,000</option>
              <option>$500,000</option>
              <option>$750,000</option>
              <option>$1,000,000</option>
            </select>
          </div>

          {/* Find / Clear */}
          <button
            onClick={appliedFilters.location || appliedFilters.type || appliedFilters.cost ? handleClearFilters : handleFindProperty}
            className={`${appliedFilters.location || appliedFilters.type || appliedFilters.cost ? "bg-red-600 hover:bg-red-700" : "secondary-button"} text-white transition rounded-lg p-3 font-semibold`}
          >
            {appliedFilters.location || appliedFilters.type || appliedFilters.cost ? "Clear" : "Find Property"}
          </button>
        </div>
      </div>

      {/* Intro Section */}
      <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto mt-28 text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-4">
        <img src={assets.projectvector} alt="Projects Icon" className="w-10 h-10 object-contain" />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-Gothic">Our Exceptional Projects</h2>
          <p className="text-gray-400 mt-3 max-w-2xl">Explore our portfolio to see the breadth and quality of our work, and get inspired to start your own dream project.</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto py-16">
        {displayedProjects.length === 0 ? (
          <p className="text-center text-gray-400 text-xl">No results found</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="min-w-[280px] sm:min-w-0 p-4 bg-[#1a1a1a] border border-white/20 rounded-xl shadow-lg text-white flex-shrink-0 flex flex-col transition-transform duration-500 hover:scale-[1.03] hover:shadow-2xl"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <img src={project.image} alt={project.title} className="h-[200px] w-full object-cover rounded-md" />
                  <h4 className="text-lg sm:text-xl font-Gothic mt-4">{project.title}</h4>
                  <p className="text-gray-400 font-sans mt-2 font-extralight line-clamp-2">{project.description}</p>
                  <p className="text-sm text-gray-400 mt-2 flex font-Gothic items-center">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1" />{project.location}
                  </p>
                  <p className="mt-3 inline-block text-xs border border-white text-white px-2 py-[2px] rounded-full">{project.speciality}</p>
                  <button className="secondary-button mt-5 py-2 rounded-lg">View Property</button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Toggle Button */}
        {displayedProjects.length > 0 && (
          <div className="flex justify-center mt-10">
            <button onClick={handleToggleProjects} className="px-6 py-3 bg-[#0d0d0d] border border-white/30 text-white hover:bg-[#1a1a1a] transition rounded-lg font-semibold">
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>

      <LetsBuild />
    </div>
  );
};

export default Projects;
