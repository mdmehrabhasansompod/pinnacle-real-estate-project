import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import LetsBuild from '../../components/Letsbuild/Letsbuild';
import ContactForm from '../../components/contactForm/contactForm';

const Service = () => {
  const serviceVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } })
  };

  return (
    <div className='text-white'>
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-Gothic w-[90%] sm:w-[80%] mx-auto my-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <motion.h3
          className="text-2xl sm:text-3xl md:text-5xl md:w-[40%] leading-tight"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Bringing Your Vision to Life
        </motion.h3>
        <motion.p
          className="md:w-[55%] font-sans font-extralight leading-6 text-gray-300 mt-4 md:mt-0 text-sm sm:text-base md:text-lg"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Pinnacle's commitment to excellence extends beyond just constructing buildings - it's about crafting exceptional spaces that inspire and delight.
        </motion.p>
      </motion.div>

      {/* Hero Image */}
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="w-[90%] sm:w-[80%] mx-auto my-8"
      >
        <img 
          src={assets.serviceHero} 
          alt="Service Hero" 
          className="w-full h-auto rounded-xl shadow-lg object-cover"
        />
      </motion.div>

      {/* Services Section */}
      <div className='w-[90%] sm:w-[80%] mx-auto my-12 flex flex-col md:flex-row gap-8'>
        {/* Left Text + Button */}
        <motion.div
          className="w-full md:w-[40%] space-y-6 flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3 className="text-2xl sm:text-3xl md:text-5xl font-Gothic mb-4 md:mb-6" variants={serviceVariants}>
            Residential Construction
          </motion.h3>
          <motion.div variants={serviceVariants}>
            <Link 
              to="/services#contact"
              className="secondary-button !px-6 w-full sm:w-auto text-center py-3 transition-all hover:scale-105"
            >
              Schedule a Call
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Description */}
        <motion.div className='w-full md:w-[60%] flex flex-col gap-8'>
          <motion.p className="font-sans font-extralight text-gray-300 leading-6 text-sm sm:text-base md:text-lg" variants={serviceVariants}>
            Pinnacle has a long history of delivering exceptional residential construction services, from custom homes to community developments to renovations...
          </motion.p>

          {[ 
            { title: 'Custom Homes', desc: 'Designing and building custom homes tailored to client needs...', img: assets.service1 },
            { title: 'Community Development', desc: 'Developing vibrant, sustainable communities with amenities...', img: assets.service2 },
            { title: 'Renovations', desc: 'Updating single rooms or entire properties with expertise...', img: assets.service3 }
          ].map((service, i) => (
            <motion.div key={service.title} custom={i} initial="hidden" whileInView="visible" variants={serviceVariants} className='flex flex-col gap-4'>
              <motion.p className="text-xl sm:text-2xl md:text-3xl font-Gothic">{service.title}</motion.p>
              <motion.p className="font-sans font-extralight text-gray-300 leading-6 text-sm sm:text-base md:text-lg">{service.desc}</motion.p>
              <motion.img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-auto rounded-xl shadow-lg" 
                whileHover={{ scale: 1.03 }} 
                transition={{ duration: 0.3 }} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Contact Form Section */}
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        className="w-[90%] sm:w-[80%] mx-auto my-12"
      >
        <ContactForm />
      </motion.div>

      {/* LetsBuild Section */}
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        className="w-[90%] sm:w-[80%] mx-auto my-12"
      >
        <LetsBuild />
      </motion.div>
    </div>
  );
};

export default Service;


