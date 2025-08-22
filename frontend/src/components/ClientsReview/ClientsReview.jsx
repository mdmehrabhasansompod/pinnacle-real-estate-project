import React from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { motion } from 'framer-motion';

export const ClientsReview = () => {
  const clientReviews = [
    {
      id: 1,
      name: 'Sophia Martinez',
      title: 'CEO, Nova Designs',
      image: assets.Client1,
      message: `"Working with Pinnacle has been an absolute pleasure. Their attention to detail, professionalism, and dedication to delivering quality exceeded all our expectations. They truly bring our visions to life."`,
    },
    {
      id: 2,
      name: 'David Reynolds',
      title: 'Director, Horizon Realty',
      image: assets.Client2,
      message: `"From the initial consultation to the final handover, Pinnacle demonstrated unmatched expertise. Their team is highly responsive, innovative, and committed to excellence in every project."`,
    },
    {
      id: 3,
      name: 'Emily J. Parker',
      title: 'Owner, Parker & Co.',
      image: assets.Client3,
      message: `"We were amazed by Pinnacle’s ability to understand our needs and execute with precision. The quality of craftsmanship and attention to detail is exceptional. Highly recommend them for any project, big or small."`,
    },
    {
      id: 4,
      name: 'Liam Henderson',
      title: 'Manager, Carter & Sons',
      image: assets.Client4,
      message: `"Pinnacle’s team is reliable, efficient, and extremely professional. They guided us through every step of the project, ensuring our expectations were met and exceeded. Truly a partner you can trust."`,
    },
    {
      id: 5,
      name: 'Isabella Nguyen',
      title: 'Founder, Urban Living',
      image: assets.Client5,
      message: `"Their innovative approach and commitment to excellence are unparalleled. Pinnacle transformed our ideas into reality seamlessly, delivering results that are both stunning and functional. We couldn’t be happier."`,
    },
    {
      id: 6,
      name: 'Ethan Wallace',
      title: 'CEO, Wallace Developments',
      image: assets.Client6,
      message: `"Working with Pinnacle was a game-changer for our business. Their professionalism, expertise, and dedication ensured a smooth process from start to finish. The final outcome surpassed all expectations."`,
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
      <div className="mt-10">
        {/* Grid for md and up */}
        <div className="hidden md:grid md:grid-cols-3 xl:grid-cols-3 gap-6">
          {clientReviews.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.03, boxShadow: '0 15px 25px rgba(255,255,255,0.1)' }}
              className="flex flex-col items-center gap-4 p-6 border border-white/20 bg-black rounded-lg cursor-pointer"
            >
              <img
                src={client.image}
                alt={client.name}
                className="h-[100px] w-[100px] object-cover rounded-full"
              />
              <div className="text-white text-center">
                <p className="text-sm italic">{client.message}</p>
                <p className="mt-3 text-orange-400 font-semibold">– {client.name}</p>
                <p className="text-sm text-gray-400">{client.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Horizontal scroll for mobile */}
        <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth">
          {clientReviews.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.03, boxShadow: '0 15px 25px rgba(255,255,255,0.1)' }}
              className="snap-start flex-shrink-0 w-[280px] flex flex-col items-center gap-4 p-6 border border-white/20 bg-black rounded-lg cursor-pointer"
            >
              <img
                src={client.image}
                alt={client.name}
                className="h-[100px] w-[100px] object-cover rounded-full"
              />
              <div className="text-white text-center">
                <p className="text-sm italic">{client.message}</p>
                <p className="mt-3 text-orange-400 font-semibold">– {client.name}</p>
                <p className="text-sm text-gray-400">{client.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


