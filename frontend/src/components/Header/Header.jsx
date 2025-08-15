import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/frontend_assets/assets';

const Header = () => {
  return (
    <div className="relative w-full min-h-screen px-4 sm:px-8 lg:px-[10%] pt-20 bg-transparent overflow-hidden">
      {/* Background Image (Building) */}
      <img
        src={assets.Headerbuilding}
        alt="Building"
        className="absolute right-0 top-0 w-[300px] sm:w-[450px] lg:w-[600px] h-auto z-0 object-contain"
      />
      {/* Stars */}
      <img
        src={assets.Headerstar1}
        alt="Star 1"
        className="absolute right-2 top-[120px] w-[100px] sm:w-[180px] lg:w-[250px] z-0 object-contain"
      />
      <img
        src={assets.Headerstar2}
        alt="Star 2"
        className="absolute right-[150px] top-[400px] w-[100px] sm:w-[180px] lg:w-[250px] z-0 object-contain"
      />

      {/* Text Content */}
      <div className="relative z-10 max-w-[650px] text-white mt-[20vh] lg:mt-[30vh]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-Gothic leading-tight">
          Creating a Better <br /> Tomorrow, One <br /> Home at a Time
        </h2>
        <p className="mt-6 text-base sm:text-lg font-light font-sans leading-relaxed">
          We've built a reputation for delivering exceptional results and exceeding our clients'
          expectations. From luxurious residential homes to state-of-the-art commercial properties,
          our team of experts is dedicated to bringing your vision to life.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <button className="primary-button w-full sm:w-auto">Schedule a Call</button>
          <Link to="/projects" className="secondary-button w-full sm:w-auto text-center">
            View Our Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
