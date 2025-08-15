import React from 'react';
import { assets } from '../../assets/frontend_assets/assets';

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
    <div className="mt-24 mx-auto w-[90%] max-w-[1300px] leading-8">
      <h3 className="flex items-center justify-center text-white font-Gothic text-2xl md:text-4xl mb-4">
        What Our Clients Say
        <img src={assets.clientsvector} alt="" className="ml-3 w-6 md:w-8" />
      </h3>

      <p className="font-sans text-white text-sm md:text-base w-full max-w-[700px] mx-auto text-center">
        At Pinnacle, we're not just building structures – we're building relationships. Here's what some of our satisfied clients have to say about their experience with us.
      </p>

      <img
        src={assets.flyerRating}
        className="w-[90%] max-w-[600px] mx-auto mt-6"
        alt="Flyer Rating"
      />

      {/* Horizontally scrollable container on small screens, grid on md+ */}
      <div
        className="
          mt-10
          flex space-x-4 overflow-x-auto
          md:grid md:grid-cols-2 xl:grid-cols-3 md:space-x-0
          scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-700
          "
      >
        {clientReviews.map((client) => (
          <div
            key={client.id}
            className="
              flex-shrink-0
              w-[280px]
              sm:w-[320px]
              flex flex-col sm:flex-row items-center gap-4 p-6
              border border-white/20 bg-black rounded-lg
              md:w-auto
            "
          >
            <img
              src={client.image}
              alt={client.name}
              className="h-[100px] w-[100px] object-cover rounded-full"
            />
            <div className="text-white text-center sm:text-left">
              <p className="text-sm italic">"{client.message}"</p>
              <p className="mt-3 text-orange-400 font-semibold">– {client.name}</p>
              <p className="text-sm text-gray-400">{client.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
