import React from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LetsBuild = () => {
  return (
    <div className="relative z-0 w-[90%] md:w-[80%] mx-auto mt-[100px] h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden">

      {/* Orange Background */}
      <div className="absolute inset-0 bg-[#FF5200] rounded-2xl z-10" />

      {/* Top Left Vector with floating animation */}
      <motion.img
        src={assets.uppervector}
        alt="Top Left Decoration"
        className="absolute top-0 left-0 w-[120px] sm:w-[160px] md:w-[200px] z-20 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom Right Vector with floating animation */}
      <motion.img
        src={assets.lowervector}
        alt="Bottom Right Decoration"
        className="absolute bottom-0 right-0 w-[120px] sm:w-[160px] md:w-[200px] z-20 pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Text Content */}
      <motion.div
        className="relative z-30 flex flex-col justify-center items-center text-center h-full px-4 md:px-8 text-white font-Gothic"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-xl sm:text-2xl md:text-4xl inline-flex items-center justify-center gap-2 leading-tight whitespace-nowrap">
          Let&apos;s Build
          <motion.img
            src={assets.blackVector}
            alt="Wave"
            className="h-[18px] sm:h-[24px] md:h-[40px] inline-block align-baseline"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          Something
        </h1>
        <h2 className="text-base sm:text-xl md:text-3xl mt-2 md:mt-4">
          Extraordinary Together
        </h2>

        <Link
          to="/projects"
          className="mt-6 sm:mt-8 md:mt-12 bg-black text-white font-sans px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded hover:bg-gray-900 transition-colors duration-300 text-sm sm:text-base md:text-lg"
        >
          View Our Projects
        </Link>
      </motion.div>
    </div>
  );
};

export default LetsBuild;


