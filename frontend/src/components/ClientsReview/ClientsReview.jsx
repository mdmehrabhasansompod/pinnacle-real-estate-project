import React from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { motion } from 'framer-motion';

export const ClientsReview = () => {
  const clientReviews = [
    {
      id: 1,
      name: 'Sophia Lee',
      title: 'CEO, Nova Designs',
      image: assets.Client1,
      message: `"Pinnacle's attention to detail and commitment to excellence is unparalleled. Their team is professional, courteous, and always willing to go the extra mile."`,
    },
    {
      id: 2,
      name: 'Michael Thompson',
      title: 'Director, Thompson Realty',
      image: assets.Client2,
      message: `"They truly transformed our vision into reality. From start to finish, the Pinnacle team was incredible to work with."`,
    },
    {
      id: 3,
      name: 'Emily J. Smith',
      title: 'Owner, Smith & Co.',
      image: assets.Client3,
      message: `"Exceptional craftsmanship and attention to our needs. Highly recommend Pinnacle for any project, big or small."`,
    },
    {
      id: 4,
      name: 'Liam Carter',
      title: 'Manager, Carter & Sons',
      image: assets.Client4,
      message: `"They were reliable, professional, and efficient. A team you can trust without hesitation."`,
    },
    {
      id: 5,
      name: 'Michael Thompson',
      title: 'Director, Thompson Realty',
      image: assets.Client2,
      message: `"They truly transformed our vision into reality. From start to finish, the Pinnacle team was incredible to work with."`,
    },
    {
      id: 6,
      name: 'Liam Carter',
      title: 'Manager, Carter & Sons',
      image: assets.Client4,
      message: `"They were reliable, professional, and efficient. A team you can trust without hesitation."`,
    },
  ];

  return (
    <div className="mt-24 mx-auto w-[90%] max-w-[1300px] leading-8 font-sans">
      {/* Header */}
      <h3 className="flex items-center justify-center text-white font-Gothic text-2xl md:text-4xl mb-4 gap-2">
        What Our Clients Say
        <img src={assets.clientsvector} alt="" className="w-6 md:w-8" />
      </h3>

      <p className="text-white text-sm md:text-base max-w-[700px] mx-auto text-center">
        At Pinnacle, we're not just building structures – we're building relationships. Here's what some of our satisfied clients have to say about their experience with us.
      </p>

      <img
        src={assets.flyerRating}
        className="w-[90%] max-w-[600px] mx-auto mt-6"
        alt="Flyer Rating"
      />

      {/* Client Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {clientReviews.map((client, idx) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.02, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, boxShadow: '0 15px 25px rgba(255,255,255,0.1)' }}
            className="flex flex-col sm:flex-row items-center gap-4 p-6 border border-white/20 bg-black rounded-lg cursor-pointer"
          >
            <img
              src={client.image}
              alt={client.name}
              className="h-[100px] w-[100px] object-cover rounded-full flex-shrink-0"
            />
            <div className="text-white text-center sm:text-left">
              <p className="text-sm italic">{client.message}</p>
              <p className="mt-3 text-orange-400 font-semibold">– {client.name}</p>
              <p className="text-sm text-gray-400">{client.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
