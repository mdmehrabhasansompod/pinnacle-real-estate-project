import React, { useState, useEffect } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { ClientsReview } from "../../components/ClientsReview/ClientsReview";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import LetsBuild from "../../components/Letsbuild/LetsBuild";
import { motion } from "framer-motion";
import axios from "axios";
import { API_BASE_URL } from "../../config/constants"; // Make sure this points to your backend base URL

const AboutUs = () => {
  const [teamData, setTeamData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  // Fetch team members from backend
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/team`);
        setTeamData(response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    fetchTeam();
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < teamData.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleTeam = teamData.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="text-white">
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-Gothic w-[90%] sm:w-[80%] my-[7%] mx-auto flex flex-col md:flex-row justify-between gap-6"
      >
        <h3 className="text-4xl sm:text-5xl md:w-[40%]">We're building communities</h3>
        <p className="md:w-[55%] font-sans font-extralight mt-4 md:mt-0 leading-6 text-gray-300">
          With a commitment to quality, innovation, and customer satisfaction, we've established ourselves as a trusted leader in the construction and real estate industry. We're passionate about building exceptional homes and communities that exceed our clients' expectations. 
        </p>
      </motion.div>

      {/* Hero Images */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="my-8 w-[90%] sm:w-[80%] mx-auto flex flex-col sm:flex-row gap-4"
      >
        <img
          src={assets.aboutHeroImg1}
          className="w-full sm:w-[72%] h-auto rounded-md shadow-lg object-cover"
          alt=""
        />
        <img
          src={assets.aboutHeroImg2}
          className="w-full sm:w-[25%] h-auto rounded-md shadow-lg object-cover self-start"
          alt=""
        />
      </motion.div>

      {/* Story Section */}
      <motion.div
        id="story"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[90%] sm:w-[80%] mx-auto flex flex-col lg:flex-row gap-8 my-16"
      >
        <div className="lg:w-[30%]">
          <h3 className="text-3xl sm:text-4xl font-Gothic leading-10">Our Story & Values</h3>
        </div>
        <div className="lg:w-[70%] font-sans font-extralight text-gray-300">
          <p>
            Pinnacle was founded in 2005 by John Doe, a seasoned entrepreneur with a vision to create a company that would revolutionize the way homes are built and lived in. As Pinnacle's founder and CEO, John Doe has led the company to new heights, driven by his unwavering commitment to excellence.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mt-8 flex flex-col md:flex-row items-center gap-4"
          >
            <img src={assets.ceoIMG} className="w-32 h-32 rounded-full object-cover" alt="" />
            <div>
              <h4 className="italic text-gray-100">
                "At Pinnacle, we believe that every home we build should be a masterpiece - a reflection of our clients' dreams and aspirations. That's why we're dedicated to pushing the boundaries of what's possible in construction and real estate."
              </h4>
              <p className="mt-2 text-gray-400">
                - John Doe, Founder and CEO
              </p>
            </div>
          </motion.div>

          <p className="mt-6">
            Since its inception, Pinnacle has grown to become a leading player in the industry, completing over 500 projects and serving thousands of satisfied clients. Today, the company employs a team of over 200 professionals, each with a unique set of skills and expertise.
          </p>
          <p className="mt-4" id="values">
            At Pinnacle, we're guided by a set of core values that shape our approach to every project we undertake. These values include:
          </p>

          <ul className="list-disc ml-5 mt-4 leading-7 text-gray-300">
            <li><b>Quality:</b> We're committed to delivering exceptional quality in every aspect of our work, from design to construction to customer service.</li>
            <li><b>Innovation:</b> We're always looking for new and innovative ways to improve our processes, products, and services, ensuring that our clients receive the best possible experience.</li>
            <li><b>Customer Satisfaction:</b> We're dedicated to exceeding our clients' expectations, providing them with a personalized and tailored experience that meets their unique needs and preferences.</li>
            <li><b>Sustainability:</b> We're committed to building sustainable homes and communities that minimize our impact on the environment and promote a healthier, more sustainable future.</li>
          </ul>
        </div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-[90%] sm:w-[80%] mx-auto my-16"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <h3 className="text-3xl sm:text-4xl font-Gothic text-center">Our Achievements</h3>
          <img src={assets.clientsvector} className="w-6 sm:w-8" alt="" />
        </div>
        <p className="text-center font-sans font-extralight text-gray-300 w-full sm:w-[60%] mx-auto mb-4">
          With the company now serving over 100 countries and available in 19 different languages. Our customer base is diverse and global, with a strong presence in Europe, Asia, and the Americas.
        </p>
        <img
          src={assets.achievementAbout}
          className="mx-auto my-6 w-full sm:w-[90%] rounded-lg shadow-lg"
          alt=""
        />
      </motion.div>

      {/* Clients Review */}
      <ClientsReview />

      {/* Team Section */}
      <div className="w-[90%] max-w-[1200px] mx-auto my-16 relative" id='team'>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
          <img src={assets.teamVector} className="w-8 sm:w-10" alt="" />
          <h3 className="text-3xl sm:text-4xl font-Gothic text-center">Our Experienced Team</h3>
        </div>
        <p className="text-center font-sans font-extralight text-gray-300 w-full sm:w-[60%] mx-auto mb-8">
          With a diverse range of skills and expertise, our team is dedicated to delivering exceptional results and exceeding our clients' expectations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTeam.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: member.id * 0.2 }}
              className="p-6 border border-white/20 rounded-lg bg-black text-white hover:scale-105 hover:shadow-xl transition-transform duration-500 ease-in-out"
            >
              <img
                src={member.image || assets.ceoIMG}
                alt={member.name}
                className="h-48 w-48 sm:h-52 sm:w-52 object-cover rounded-full mx-auto"
              />
              <h4 className="text-xl font-Gothic mt-4 text-center">{member.name}</h4>
              <p className="text-gray-300 mt-1 font-sans text-center">{member.position}</p>
              <p className="text-gray-400 font-sans text-sm mt-3 text-center leading-6">{member.bio}</p>
            </motion.div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-400 font-sans text-sm">
            {Math.min(currentIndex + itemsPerPage, teamData.length)} / {teamData.length}
          </p>
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-3 bg-gray-800 rounded-full disabled:opacity-40 hover:bg-gray-700 transition"
            >
              <FaArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex + itemsPerPage >= teamData.length}
              className="p-3 bg-gray-800 rounded-full disabled:opacity-40 hover:bg-gray-700 transition"
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <LetsBuild />
    </div>
  );
};

export default AboutUs;
