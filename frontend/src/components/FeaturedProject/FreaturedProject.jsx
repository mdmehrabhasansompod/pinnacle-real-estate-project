import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { assets } from '../../assets/frontend_assets/assets'; // Your images
import { projectsData } from '../../assets/frontend_assets/assets';


const ProjectsPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < projectsData.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleProjects = projectsData.slice(currentIndex, currentIndex + itemsPerPage);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className='projects-section w-[90%] max-w-[1400px] mx-auto py-16 mt-[100px] relative font-Gothic'>

      {/* Title */}
      <div className='flex items-center gap-3 mb-6'>
        <img src={assets.projectvector} alt="Vector Decoration" className='w-6 sm:w-8' />
        <h2 className='text-2xl sm:text-3xl md:text-4xl text-white'>Featured Projects</h2>
      </div>

      {/* Description + Button */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12'>
        <p className='text-gray-400 font-sans text-sm sm:text-base md:text-lg max-w-3xl'>
          We've built a reputation for delivering exceptional results and exceeding our clients' expectations. From luxurious residential homes to state-of-the-art commercial properties, our team of experts is dedicated to bringing your vision to life.
        </p>
        <Link
          to='/projects'
          className='secondary-button !px-8 md:!px-[100px] whitespace-nowrap'
        >
          See All Properties
        </Link>
      </div>

      {/* Project Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <AnimatePresence>
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className='p-4 bg-[#1a1a1a] border border-white/20 rounded-xl shadow-lg text-white flex flex-col transition-transform duration-500 hover:scale-[1.03] hover:shadow-2xl'
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className='h-[200px] w-full object-cover rounded-md'
              />
              <h4 className='text-lg sm:text-xl font-semibold mt-4'>{project.title}</h4>
              <p className='text-gray-400 mt-2 text-sm font-sans font-extralight line-clamp-2'>{project.description}</p>
              <p className='text-sm text-gray-400 mt-2 flex items-center'>
                <FaMapMarkerAlt className='w-4 h-4 mr-1' />
                {project.location}
              </p>
              <p className='mt-3 inline-block text-xs border border-white text-white px-2 py-[2px] rounded-full'>
                {project.speciality}
              </p>
              <button className='secondary-button !px-[80px] mt-5 mx-auto block'>
                View Property
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className='w-full flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 px-0 sm:px-4'>
        <p className='text-sm text-gray-500 font-sans'>
          Showing {Math.min(currentIndex + 1, projectsData.length)}–{Math.min(currentIndex + itemsPerPage, projectsData.length)} of {projectsData.length} Projects
        </p>

        <div className='flex gap-4'>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className='px-4 py-2 bg-amber-50 border cursor-pointer rounded disabled:opacity-40 hover:bg-gray-100 transition'
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= projectsData.length}
            className='px-4 py-2 bg-amber-50 border cursor-pointer rounded disabled:opacity-40 hover:bg-gray-100 transition'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPreview;
