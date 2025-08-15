import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/frontend_assets/assets';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menu, setMenu] = useState('Home');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ['Home', 'About Us', 'Projects', 'Services', 'News'];

  return (
    <header className="w-full bg-black text-gray-200 relative z-50">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 h-[104px]">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-[29px] w-[138px]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 font-sans ml-10">
          {navItems.map((item) => (
            <Link
              key={item}
              to="/"
              onClick={() => setMenu(item)}
              className={`px-4 py-2 rounded-md transition duration-300 ${
                menu === item
                  ? 'bg-[rgb(44,44,44)] text-white'
                  : 'text-gray-400 hover:bg-[rgb(64,64,64)] hover:text-white'
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Desktop Contact Button */}
        <button className="primary-button hidden lg:block">Contact us</button>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden z-50">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-[104px] left-0 w-full bg-black transition-all duration-300 ease-in-out shadow-md ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-2 px-6 py-4">
          {navItems.map((item) => (
            <Link
              key={item}
              to="/"
              onClick={() => {
                setMenu(item);
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-md transition duration-300 ${
                menu === item
                  ? 'bg-[rgb(44,44,44)] text-white'
                  : 'text-gray-400 hover:bg-[rgb(64,64,64)] hover:text-white'
              }`}
            >
              {item}
            </Link>
          ))}
          <button className="primary-button mt-4 w-full">Contact us</button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

