import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import ContactForm from "../../components/contactForm/contactForm";
import FAQ from "../../components/FAQ/FAQ";
import LetsBuild from "../../components/Letsbuild/Letsbuild";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-auto text-white py-16 font-Gothic">

      {/* Header Section (Left-aligned) */}
      <motion.div
        className="my-8 text-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold">Contact Us</h1>
        <p className="font-sans font-extralight max-w-2xl mt-4 text-gray-300">
          We value your feedback and would love to hear from you. Whether you
          have a question, a comment, or a suggestion, we're here to listen and
          help in any way we can.
        </p>
        <motion.img
          src={assets.contactHero}
          alt="Contact Hero"
          className="mt-6 rounded-2xl shadow-xl w-full max-h-[400px] object-cover"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </motion.div>

      {/* Contact Info + Form */}
      <div className="flex flex-col lg:flex-row gap-12 my-12">

        {/* Left Side - Contact Info */}
        <motion.div
          className="lg:w-1/3 w-full space-y-10 bg-gray-900/40 backdrop-blur-md p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Get in Touch */}
          <div id="Address">
            <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
            <a
              href="mailto:info@pinnacle.com"
              className="block text-gray-300 hover:text-orange-400 transition"
            >
              info@pinnacle.com
            </a>
            <a
              href="tel:+11234567890"
              className="block text-gray-300 hover:text-orange-400 transition mt-1"
            >
              +1 (123) 456-7890
            </a>
          </div>

          {/* Office Address */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Our Office</h2>
            <address className="not-italic text-gray-300 leading-relaxed">
              123 Main St, <br /> Anytown, USA 12345
            </address>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=123+Main+St,+Anytown,+USA+12345"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline mt-3 inline-block"
            >
              Get Directions →
            </a>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Connect with us</h2>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-orange-500 transition"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-orange-500 transition"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-orange-500 transition"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </motion.div>

     
   {/* Right Side - Contact Form */}
<motion.div
  className="lg:flex-1 w-full font-sans font-semibold" 
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
>
  {/* Force font-Gothic on all nested inputs/textareas/selects */}
  <div id="form" className="space-y-0 [&_input]:font-sans [&_textarea]:font-sans [&_select]:font-sans">
    <ContactForm />
  </div>
</motion.div>

      </div>

      {/* FAQ + LetsBuild Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-12"
      >
        <FAQ />
        <LetsBuild />
      </motion.div>
    </div>
  );
};

export default Contact;
