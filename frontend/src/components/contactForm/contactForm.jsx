import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiDollarSign,
  FiMapPin,
  FiLayers,
  FiMessageSquare,
} from "react-icons/fi";
import { assets } from "../../assets/frontend_assets/assets";

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
  const [countryFlag, setCountryFlag] = useState("🌐");

  const phoneRef = useRef(null);
  const itiRef = useRef(null);

  useEffect(() => {
    if (phoneRef.current) {
      itiRef.current = intlTelInput(phoneRef.current, {
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        separateDialCode: true,
        preferredCountries: ["us", "gb", "ca", "au", "in"],
        initialCountry: "auto",
        geoIpLookup: (callback) => {
          fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((data) => callback(data.country_code))
            .catch(() => callback("us"));
        },
      });

      const initialCountry = itiRef.current.getSelectedCountryData();
      setCountryFlag(getFlagEmoji(initialCountry.iso2));
      phoneRef.current.addEventListener("countrychange", () => {
        const country = itiRef.current.getSelectedCountryData();
        setCountryFlag(getFlagEmoji(country.iso2));
      });
    }

    return () => {
      if (itiRef.current) itiRef.current.destroy();
    };
  }, []);

  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return "🌐";
    return countryCode
      .toUpperCase()
      .split("")
      .map((c) => 127397 + c.charCodeAt())
      .map((cp) => String.fromCodePoint(cp))
      .join("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itiRef.current)
      setFormData((prev) => ({ ...prev, phone: itiRef.current.getNumber() }));

    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
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
        if (itiRef.current) itiRef.current.setNumber("");
      }, 3000);
    }, 1500);
  };

  const fieldVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08 } }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center px-4"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        {/* Heading */}
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-white mb-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <img
            className="w-12 sm:w-16 h-12 sm:h-16 object-contain"
            src={assets.serviceContact}
            alt="icon"
          />
          <span className="font-Gothic">Have a project in your mind?</span>
        </motion.h2>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full bg-black bg-opacity-50 backdrop-blur-lg p-6 sm:p-8 lg:p-12 rounded-2xl border border-gray-700 shadow-xl"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {[ 
              { label: "Name", icon: <FiUser />, name: "name", type: "text" },
              { label: "Phone", icon: <FiPhone />, name: "phone", type: "phone" },
              { label: "Email", icon: <FiMail />, name: "email", type: "email" },
            ].map((field, i) => (
              <motion.div
                key={field.name}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fieldVariant}
              >
                <label className="block text-sm text-gray-300 mb-2">
                  {field.label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    {field.icon}
                  </div>
                  {field.type === "phone" ? (
                    <>
                      <div className="absolute inset-y-0 left-10 pl-2 flex items-center text-xl">
                        {countryFlag}
                      </div>
                      <input
                        ref={phoneRef}
                        type="tel"
                        name="phone"
                        required
                        className="block w-full sm:pl-20 pl-16 pr-3 py-3 bg-gray-800 bg-opacity-40 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Phone number"
                      />
                    </>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800 bg-opacity-40 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder={field.label}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {[ 
              {
                label: "Budget",
                icon: <FiDollarSign />,
                name: "budget",
                type: "select",
                options: ["", "<$5k", "$5k-$10k", "$10k-$25k", "$25k+"],
              },
              { label: "Location", icon: <FiMapPin />, name: "location", type: "text" },
              {
                label: "Service",
                icon: <FiLayers />,
                name: "service",
                type: "select",
                options: ["", "Residential Construction", "Custom Homes", "Community Development", "Renovations"],
              },
            ].map((field, i) => (
              <motion.div
                key={field.name}
                custom={i + 3}
                initial="hidden"
                animate="visible"
                variants={fieldVariant}
              >
                <label className="block text-sm text-gray-300 mb-2">{field.label}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">{field.icon}</div>
                  {field.type === "text" ? (
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800 bg-opacity-40 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder={field.label}
                    />
                  ) : (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800 bg-opacity-40 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt || `Select ${field.label}`}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message */}
          <motion.div
            custom={6}
            initial="hidden"
            animate="visible"
            variants={fieldVariant}
            className="mb-6"
          >
            <label className="block text-sm text-gray-300 mb-2">Message</label>
            <div className="relative">
              <div className="absolute top-3 left-3 text-gray-400">
                <FiMessageSquare />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="block w-full pl-10 pr-3 py-3 bg-gray-800 bg-opacity-40 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Tell us about your project..."
              />
            </div>
          </motion.div>

          {/* Terms + Submit */}
          <motion.div
            custom={7}
            initial="hidden"
            animate="visible"
            variants={fieldVariant}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
                className="h-5 w-5 text-orange-600 border-gray-600 rounded bg-gray-800"
              />
              <span className="ml-3 text-gray-300 text-sm">
                I agree to{" "}
                <a href="#" className="text-orange-400 hover:text-orange-300">Terms</a> and{" "}
                <a href="#" className="text-orange-400 hover:text-orange-300">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting || submitSuccess}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                isSubmitting || submitSuccess
                  ? "bg-green-600 hover:bg-green-700"
                  : "secondary-button"
              }`}
            >
              {isSubmitting
                ? "Processing..."
                : submitSuccess
                ? "Message Sent!"
                : "Send Message"}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
