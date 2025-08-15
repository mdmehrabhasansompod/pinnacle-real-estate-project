import React from 'react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPaperPlane,
} from 'react-icons/fa';
import { assets } from '../../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-white py-16 px-6 md:px-20 mt-32">
      <div className="max-w-screen-xl mx-auto flex flex-wrap gap-10 font-sans">

        {/* Logo + Email */}
        <div className="flex flex-col items-start gap-8 flex-[1_1_300px] min-w-[280px]">
          <img
            src={assets.logo}
            alt="Pinnacle Logo"
            className="w-36 sm:w-44"
          />

          {/* Email subscription */}
          <div className="relative w-full max-w-md">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-12 py-2 rounded-md text-black font-Gothic placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#FF5200] text-white px-3 py-1 rounded hover:bg-[#e64b00] transition"
              aria-label="Send email"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>

        {/* Footer Menus */}
        {[
          { title: 'Navigation', items: ['Home', 'Properties', 'Testimonials', "FAQ's", 'Terms and Conditions'] },
          { title: 'About Us', items: ['Our Story', 'Our Values', 'Our Team'] },
          { title: 'Properties', items: ['Portfolio', 'Categories'] },
          { title: 'Services', items: ['Residential Construction', 'Commercial Construction', 'Property Management', 'Development Services'] },
          { title: 'Contact Us', items: ['Contact Form', 'Our Offices'] },
        ].map(({ title, items }, idx) => (
          <div key={idx} className="flex-[1_1_150px] min-w-[150px]">
            <h4 className="text-lg font-Gothic mb-4">{title}</h4>
            <ul className="space-y-2 text-sm font-sans whitespace-nowrap">
              {items.map((item, i) => (
                <li key={i} className="hover:text-[#FF5200] cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider and Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-sans gap-4 md:gap-0">
        <p>@2025 Pinnacle. All Rights Reserved | Developed by MVIOT PV</p>
        <div className="flex gap-6 text-white text-xl">
          <a href="#" aria-label="Facebook" className="hover:text-[#FF5200]"><FaFacebookF /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-[#FF5200]"><FaLinkedinIn /></a>
          <a href="#" aria-label="Twitter" className="hover:text-[#FF5200]"><FaTwitter /></a>
          <a href="#" aria-label="YouTube" className="hover:text-[#FF5200]"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
