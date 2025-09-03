import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets.js";
import { API_BASE_URL } from "../../config/constants.js";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiDollarSign,
  FiMapPin,
  FiLayers,
  FiMessageSquare,
  FiCheck
} from "react-icons/fi";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    location: "",
    service: "",
    message: "",
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "phone" && phoneError) setPhoneError("");
  };

  const validatePhoneNumber = (phone) => {
    if (!phone || phone.trim() === "") return "Phone number is required.";
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 5) return "Please enter a valid phone number.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const phoneValidationError = validatePhoneNumber(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API_BASE_URL}/contacts`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setSubmitSuccess(true);

      // Reset form after 1.5s
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          budget: "",
          location: "",
          service: "",
          message: "",
          terms: false,
        });
        setSubmitSuccess(false);
      }, 1500);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.05,
        type: "spring",
        stiffness: 120
      } 
    }),
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div id="contactForm" className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
      <motion.div 
        className="w-full max-w-3xl" // Form now takes reasonable full width
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img src={assets.serviceContact} alt="Icon" className="w-10 h-10" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center">
            Have a project in your mind?
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-50 backdrop-blur-lg p-6 sm:p-8 lg:p-10 rounded-2xl border border-gray-700 shadow-xl"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {[ 
              { name: "name", icon: FiUser, type: "text", placeholder: "Name", required: true },
              { name: "phone", icon: FiPhone, type: "tel", placeholder: "Phone" },
              { name: "email", icon: FiMail, type: "email", placeholder: "Email", required: true },
            ].map((field, i) => (
              <motion.div key={field.name} custom={i} variants={fieldVariant}>
                <label className="block text-sm text-gray-300 mb-2">{field.placeholder}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <field.icon />
                  </div>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="block w-full pl-10 pr-3 py-3 bg-gray-800 bg-opacity-40 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                    placeholder={field.placeholder}
                  />
                </div>
                {field.name === "phone" && phoneError && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-1 text-red-400 text-sm"
                  >
                    {phoneError}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {[ 
              { name: "budget", icon: FiDollarSign, type: "select", options: ["<$50k","$50k-$100k","$100k-$250k","$250k+"] },
              { name: "location", icon: FiMapPin, type: "text", placeholder: "Location" },
              { name: "service", icon: FiLayers, type: "select", options: ["Residential Construction","Commercial Construction","Property Management","Development Services"] },
            ].map((field, i) => (
              <motion.div key={field.name} custom={i+3} variants={fieldVariant}>
                <label className="block text-sm text-gray-300 mb-2">{field.name.charAt(0).toUpperCase() + field.name.slice(1)}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 z-10">
                    <field.icon />
                  </div>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800 bg-opacity-40 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all duration-300"
                    >
                      <option value="">Select {field.name}</option>
                      {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800 bg-opacity-40 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                      placeholder={field.placeholder || field.name}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message */}
          <motion.div custom={6} variants={fieldVariant} className="mb-6">
            <label className="block text-sm text-gray-300 mb-2">Message</label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-gray-400"><FiMessageSquare /></div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="block w-full pl-10 pr-3 py-3 bg-gray-800 bg-opacity-40 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                placeholder="Tell us about your project..."
              />
            </div>
          </motion.div>

          {/* Terms + Button */}
          <motion.div custom={7} variants={fieldVariant} className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="flex items-center mb-4 sm:mb-0 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  className="sr-only"
                />
                <div className={`h-5 w-5 rounded border ${formData.terms ? 'bg-orange-500 border-orange-500' : 'bg-gray-800 border-gray-600'} flex items-center justify-center transition-all duration-300`}>
                  {formData.terms && <FiCheck className="text-white text-sm" />}
                </div>
              </div>
              <span className="ml-3 text-gray-300 text-sm">
                I agree to the <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Terms</a> and <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">Privacy Policy</a>
              </span>
            </label>

            <motion.button
              type="submit"
              className="secondary-button w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : submitSuccess ? (
                <span className="flex items-center justify-center">
                  <FiCheck className="mr-2" />
                  Message Sent!
                </span>
              ) : "Send Message"}
            </motion.button>
          </motion.div>

          {/* Error Message */}
          {submitError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-900 bg-opacity-20 border border-red-700 rounded-lg"
            >
              <p className="text-red-400 text-center">{submitError}</p>
            </motion.div>
          )}

          {/* Success Message */}
          {submitSuccess && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg"
            >
              <p className="text-green-400 text-center">Your message has been sent successfully!</p>
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ContactForm;



