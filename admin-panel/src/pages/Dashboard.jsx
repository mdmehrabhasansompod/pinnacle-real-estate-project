import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../api/projectApi";
import { fetchServices } from "../api/servicesApi";
import { fetchTeams } from "../api/teamApi";
import { fetchContacts } from "../api/contactApi";
import { getAllEmails } from "../api/newsletterApi";
import { fetchNews } from "../api/newsApi";
import { motion } from "framer-motion";
import PinnacleLogo from "../assets/logo.png"; 
import { FaProjectDiagram, FaTools, FaUsers, FaEnvelope, FaNewspaper, FaPhone } from "react-icons/fa";

const Dashboard = () => {
  const [localTime, setLocalTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setLocalTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { data: projects = [] } = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const { data: teams = [] } = useQuery({ queryKey: ["teams"], queryFn: fetchTeams });
  const { data: contacts = [] } = useQuery({ queryKey: ["contacts"], queryFn: fetchContacts });
  const { data: subscribers = [] } = useQuery({ queryKey: ["subscribers"], queryFn: getAllEmails });
  const { data: news = [] } = useQuery({ queryKey: ["news"], queryFn: fetchNews });

  const stats = [
    { title: "Projects", value: projects.length, color: "bg-blue-700", icon: <FaProjectDiagram size={30} /> },
    { title: "Services", value: services.length, color: "bg-green-600", icon: <FaTools size={30} /> },
    { title: "Team Members", value: teams.length, color: "bg-purple-600", icon: <FaUsers size={30} /> },
    { title: "Contacts", value: contacts.length, color: "bg-red-600", icon: <FaPhone size={30} /> },
    { title: "Subscribers", value: subscribers.length, color: "bg-indigo-600", icon: <FaEnvelope size={30} /> },
    { title: "News", value: news.length, color: "bg-yellow-600", icon: <FaNewspaper size={30} /> },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Top Row: Dashboard | Pinnacle Logo | Time */}
      <div className="flex justify-between items-center mb-12 flex-wrap">
        {/* Dashboard Title */}
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>

        {/* Pinnacle Logo with black background */}
        <div className="bg-black p-2 rounded-md">
          <img src={PinnacleLogo} alt="Pinnacle Logo" className="h-12 w-auto" />
        </div>

        {/* Local Time */}
        <div className="text-gray-700 font-semibold text-xl text-right">
          <div className="text-lg">{localTime.toLocaleDateString()}</div>
          <div className="text-2xl font-bold">{localTime.toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className={`relative ${stat.color} text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col justify-center items-center`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
          >
            {/* Icon */}
            <div className="mb-4">{stat.icon}</div>
            <h2 className="text-2xl font-semibold">{stat.title}</h2>
            <p className="text-5xl font-bold mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
