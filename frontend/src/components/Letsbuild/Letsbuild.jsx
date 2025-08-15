import React from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';

const LetsBuild = () => {
  return (
    <div className="relative z-0 w-[90%] md:w-[80%] mx-auto mt-[100px] h-[50vh] rounded-2xl overflow-hidden">

      {/* Orange Background */}
      <div className="absolute inset-0 bg-[#FF5200] rounded-2xl z-10" />

      {/* Top Left Vector */}
      <img
        src={assets.uppervector}
        alt="Top Left Decoration"
        className="absolute top-0 left-0 w-[160px] md:w-[200px] z-20 opacity-100 pointer-events-none"
      />

      {/* Bottom Right Vector */}
      <img
        src={assets.lowervector}
        alt="Bottom Right Decoration"
        className="absolute bottom-0 right-0 w-[160px] md:w-[200px] z-20 opacity-100 pointer-events-none"
      />

      {/* Main Text Content */}
      <div className="relative z-30 flex flex-col justify-center items-center text-center h-full px-4 md:px-8 text-white font-Gothic">
        <h1 className="text-2xl sm:text-3xl md:text-4xl inline-flex items-center justify-center gap-2 leading-tight whitespace-nowrap">
          Let&apos;s Build
          <img
            src={assets.blackVector}
            alt="Wave"
            className="h-[24px] sm:h-[32px] md:h-[40px] inline-block align-baseline"
          />
          Something
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl mt-2 md:mt-4">
          Extraordinary Together
        </h2>

        <Link
          to="/projects"
          className="mt-8 sm:mt-12 bg-black text-white font-sans px-5 sm:px-6 py-3 rounded hover:bg-gray-900 transition-colors duration-300"
        >
          View Our Projects
        </Link>
      </div>
    </div>
  );
};

export default LetsBuild;


