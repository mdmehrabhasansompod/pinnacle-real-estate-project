import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import AboutUs from "./pages/About Us/AboutUs"
import Service from "./pages/Services/Service"
import Contact from "./pages/Contact/Contact"
import PrivacyPolicy from "./pages/Privacy Policy/PrivacyPolicy"
import Projects from "./pages/Projects/Projects"
import Blog from "./pages/Blog/Blog"
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<AboutUs/>} />
    <Route path="/services" element={<Service />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/news" element={<Blog />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App