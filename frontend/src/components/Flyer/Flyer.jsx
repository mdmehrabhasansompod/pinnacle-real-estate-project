import React from 'react';
import "./Flyer.css";
import { assets } from '../../assets/frontend_assets/assets';

const Flyer = () => {
  return (
    <div className="flyer-section relative z-0 bg-[#FF5200] w-[90%] max-w-[1400px] py-16 text-center mt-[100px] mx-auto overflow-hidden rounded-2xl">
      
      {/* Background Vector */}
      <img
        src={assets.vector}
        alt=""
        className="absolute bottom-[20px] left-[10%] w-[200px] sm:w-[260px] md:w-[320px] object-contain opacity-50 z-0"
      />

      {/* Heading */}
      <h3 className="font-Gothic text-white text-3xl sm:text-4xl md:text-6xl z-10 relative leading-tight">
        We're <img src={assets.flyershape} alt="" className="inline w-10 sm:w-12 mb-2" /> building <br className="hidden sm:block" /> communities
      </h3>

      {/* Paragraph */}
      <p className="text-white mt-6 text-base sm:text-lg font-sans max-w-[800px] mx-auto z-10 relative px-4 leading-relaxed">
        With a commitment to excellence and a focus on innovation, we've established ourselves as a leader in the real estate and construction industry.
      </p>

      {/* Button */}
      <button className="px-6 py-3 text-white bg-black mt-8 font-sans rounded-md hover:bg-gray-900 z-10 relative transition duration-300">
        Learn More About Us...
      </button>

      {/* Decorative Buildings */}
      <img
        src={assets.building}
        alt=""
        className="absolute w-[100px] sm:w-[120px] rotate-[300deg] right-[5%] top-[60%] z-10 object-contain"
      />
      <img
        src={assets.building}
        alt=""
        className="absolute w-[100px] sm:w-[120px] rotate-[200deg] left-[5%] top-[60%] z-10 object-contain"
      />

      {/* Rating Bar */}
      <img
        src={assets.flyerRating}
        alt=""
        className="mt-12 w-[90%] max-w-[900px] mx-auto z-10 relative object-contain"
      />
    </div>
  );
};

export default Flyer;

