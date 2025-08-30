import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPaperPlane,
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { assets } from '../../assets/frontend_assets/assets';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../../config/constants.js';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  // --- subscription functionality with proper backend URL ---
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Please enter a valid email.' });
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/newsletters/subscribe`, { email });
      setStatus({ type: 'success', message: res.data.message || 'Subscribed successfully!' });
      setEmail('');
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to subscribe. Try again.',
      });
    }

    setTimeout(() => setStatus(null), 4000); // auto-clear message
  };

  // --- footer menus remain unchanged ---
  const menus = [
    { title: 'Navigation', items: [
        { label: 'Home', to: '/#' },
        { label: 'Projects', to: '/projects#' },
        { label: 'About', to: '/about#' },
        { label: 'Privacy Policy', to: '/privacy-policy#' },
        { label: 'Services', to: '/services#' },
        { label: 'Contact', to: '/contact#' }
      ] 
    },
    { title: 'About Us', items: [
        { label: 'Our Story', to: '/about#story' },
        { label: 'Our Values', to: '/about#values' },
        { label: 'Our Team', to: '/about#team' }
      ] 
    },
    { title: 'Projects', items: [
        { label: 'Search Projects', to: '/projects#search' },
        { label: 'All Projects', to: '/projects#all-projects' }
      ] 
    },
    { title: 'Services', items: [
        { label: 'Residential Construction', to: '/services#residential' },
        { label: 'Commercial Construction', to: '/services#commercial' },
        { label: 'Property Management', to: '/services#management' },
        { label: 'Development Services', to: '/services#development' }
      ] 
    },
    { title: 'Contact Us', items: [
        { label: 'Contact Form', to: '/contact#form' },
        { label: 'Get in Touch', to: '/contact#Address' }
      ] 
    },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, type: 'spring', stiffness: 50 } }),
  };

  const iconHover = { scale: 1.2, color: '#FF5200', transition: { type: 'spring', stiffness: 300 } };

  return (
    <footer className="bg-[#0D0D0D] text-white py-16 px-6 md:px-20 mt-32 font-sans">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-10">

        {/* Logo & Email */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 flex-[1_1_300px] min-w-[280px]"
        >
          <HashLink smooth to="/#">
            <img src={assets.logo} alt="Pinnacle Logo" className="w-36 sm:w-44" />
          </HashLink>

          {/* Email subscription */}
          <form onSubmit={handleEmailSubmit} className="relative w-full max-w-md group">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition group-focus-within:text-orange-500" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-12 py-2 rounded-md text-white font-Gothic placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              required
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#FF5200] text-white px-3 py-1 rounded hover:bg-[#e64b00] transition-all duration-300"
              aria-label="Send email"
            >
              <FaPaperPlane />
            </button>
          </form>

          {status && (
            <p className={`text-sm mt-2 ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {status.message}
            </p>
          )}
        </motion.div>

        {/* Footer Menus */}
        {menus.map(({ title, items }, idx) => (
          <motion.div 
            key={idx}
            custom={idx}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            className="flex-[1_1_150px] min-w-[150px]"
          >
            <h4 className="text-lg font-Gothic mb-4">{title}</h4>
            <ul className="space-y-2 text-sm font-sans">
              {items.map((item, i) => (
                <motion.li 
                  key={i}
                  whileHover={{ x: 5, color: '#FF5200' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="cursor-pointer"
                >
                  <HashLink smooth to={item.to}>{item.label}</HashLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Divider & Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4 md:gap-0">
        <p>@2025 Pinnacle. All Rights Reserved | Developed by MVIOT PV</p>
        <div className="flex gap-6 text-white text-xl">
          {[{ icon: FaFacebookF, label: 'Facebook' },
            { icon: FaLinkedinIn, label: 'LinkedIn' },
            { icon: FaXTwitter, label: 'Twitter' },
            { icon: FaYoutube, label: 'YouTube' }
          ].map(({ icon: Icon, label }, i) => (
            <motion.a
              key={i}
              href="#"
              aria-label={label}
              whileHover={iconHover}
              className="transition-colors duration-300"
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
