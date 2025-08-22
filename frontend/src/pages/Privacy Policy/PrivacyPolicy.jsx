import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-[90%] max-w-[900px] mx-auto py-16"
    >
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-Gothic font-bold mb-8 text-white text-center">
        Privacy Policy
      </h1>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-6 text-gray-300 font-sans leading-relaxed text-justify"
      >
        Welcome to <strong>Pinnacle Real Estate</strong>. Our company has been a trusted leader in the construction and real estate industry, committed to building high-quality homes, communities, and commercial properties that exceed our clients’ expectations. The Pinnacle Real Estate app is designed to help clients explore properties, services, and stay updated on our latest projects, while ensuring your privacy and security.
      </motion.p>

      {/* Sections */}
      {[
        {
          title: 'Information We Collect',
          content: `When you use the Pinnacle Real Estate app, we may collect personal information such as your name, email, phone number, location, and property preferences. We also gather usage data, including the features you interact with and pages visited, to improve our services and provide personalized experiences.`,
        },
        {
          title: 'How We Use Your Information',
          content: `We use the information collected to provide our real estate services, communicate with you, personalize property recommendations, improve our offerings, and analyze app usage for optimization.`,
        },
        {
          title: 'Business Operations',
          content: `Pinnacle Real Estate operates across residential, commercial, and community development sectors. Our mission is to create innovative and sustainable spaces for our clients, with a focus on quality, design excellence, and customer satisfaction.`,
        },
        {
          title: 'Information Sharing',
          content: `Pinnacle Real Estate does not sell or trade your personal information. We may share data with trusted partners and service providers under strict confidentiality agreements to deliver our services efficiently.`,
        },
        {
          title: 'Data Security',
          content: `We implement industry-standard security measures to safeguard your personal information. However, no system is completely secure, and users should take care when sharing sensitive data.`,
        },
        {
          title: 'Your Rights',
          content: `You can request access, correction, or deletion of your personal information stored in our app. Contact us to exercise these rights at any time.`,
        },
        {
          title: 'Changes to This Policy',
          content: `We may update this Privacy Policy periodically to reflect changes in our business or services. Updated policies will be available in the app and take effect immediately.`,
        },
        {
          title: 'Contact Us',
          content: `For questions or concerns about this Privacy Policy or Pinnacle Real Estate services, reach out to us at support@pinnaclerealestate.com.`,
        },
      ].map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + idx * 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-Gothic font-semibold text-white mb-2">
            {section.title}
          </h2>
          <p className="text-gray-300 font-sans leading-relaxed">{section.content}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PrivacyPolicy;
