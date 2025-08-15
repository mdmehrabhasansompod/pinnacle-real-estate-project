import logo from "./logo.png"
import Headerstar1 from "./Headerstar1.png"
import Headerstar2 from "./Headerstar2.png"
import Headerbuilding from "./Headerbuilding.png"
import vector from "./vector.png"
import building from "./building.png"
import flyershape from "./flyer-shape.png"
import flyerRating from "./flyerRating.png"
import projectvector from "./projectvector.png"
import card1 from "./card1.png"
import card2 from "./card2.png"
import card3 from "./card3.png"
import location from "./location.svg"
import servicevector from "./servicevector.png"
import serviceimg from "./serviceimg.png"
import clientsvector from "./clientsvector.png"
import Client1 from "./Client1.png"
import Client2 from "./Client2.png"
import Client3 from "./Client3.png"
import Client4 from "./Client4.png"
import NewsVector from "./NewsVector.png"
import faqvector from "./faqvector.png"
import byebye from "./byebye.png"
import uppervector from "./uppervector.png"
import lowervector from "./lowervector.png"





export const assets = {
    logo,
    Headerstar1,
    Headerstar2,
    Headerbuilding,
    vector,
    building,
    flyershape,
    flyerRating,
    projectvector,
    location,
    servicevector,
    clientsvector,
    Client1,
    Client2,
    Client3,
    Client4,
    NewsVector,
    faqvector,
    byebye,
    uppervector,
    lowervector,
    
}


// src/assets/frontend_assets/projectsData.js

export const projectsData = [
    {
      id: 1,
      title: "The Grand Estate",
      description:
        "We've built a reputation for delivering exceptional results and exceeding our clients' expectations.",
      location: "Uptown, Dhaka",
      speciality: "Movie Theatre",
      image: card1, // Place image in public/images/
      featured: true,
    },
    {
      id: 2,
      title: "Urban Oasis",
      description:
        "Modern luxury in the heart of the city with eco-conscious design and premium comfort.",
      location: "Gulshan, Dhaka",
      speciality: "Infinity Pool",
      image: card2,
      featured: false,
    },
    {
      id: 3,
      title: "Green Heights",
      description:
        "A blend of nature and architecture to elevate sustainable living experiences.",
      location: "Banani, Dhaka",
      speciality: "Rooftop Garden",
      image: card3,
      featured: false,
    },
    {
      id: 4,
      title: "Skyline Tower",
      description:
        "A luxury skyscraper offering unmatched views and world-class amenities.",
      location: "Mirpur DOHS, Dhaka",
      speciality: "Helipad",
      image: card2,
      featured: true,
    },
    {
      id: 5,
      title: "Sunset Villas",
      description:
        "Exclusive villas designed for privacy, elegance, and stunning sunsets.",
      location: "Cox's Bazar",
      speciality: "Private Beach Access",
      image: card1,
      featured: false,
    },
  ];
  

  export const serviceCategories = [
    {
      category: "Residential",
      services: [
        {
          id: 1,
          title: "Modern Design",
          image: serviceimg,
          description: "Crafting sleek, functional architecture for urban spaces.",
        },
        {
          id: 2,
          title: "Heritage Preservation",
          image: serviceimg,
          description: "Reviving and protecting historic buildings with precision.",
        },
      ],
    },
    {
      category: "Property Management",
      services: [
        {
          id: 3,
          title: "Commercial Buildings",
          image: serviceimg,
          description: "End-to-end construction for large commercial spaces.",
        },
      ],
    },
    {
      category: "Commercial",
      services: [
        {
          id: 4,
          title: "Minimalist Styling",
          image: serviceimg,
          description: "Clean, calming interiors tailored to your lifestyle.",
        },
      ],
    },
    {
      category: "Consulting",
      services: [
        {
          id: 5,
          title: "Project Feasibility",
          image: serviceimg,
          description: "Comprehensive analysis and reporting before execution.",
        },
      ],
    },
    {
      category: "Development",
      services: [
        {
          id: 6,
          title: "Structural Analysis",
          image: serviceimg,
          description: "Robust, resilient engineering for all types of buildings.",
        },
      ],
    },
  ];
  


  export const blogsData = [
    {
      id: 1,
      title: "Innovations in Modern Architecture",
      excerpt: "Discover the latest trends transforming the world of architecture with sustainable designs and smart homes.",
      image: serviceimg,
      date: "July 20, 2025",
      author: "John Doe"
    },
    {
      id: 2,
      title: "How to Choose Your Dream Home",
      excerpt: "Tips and tricks to help you navigate the real estate market and find a home perfectly suited for you.",
      image: serviceimg,
      date: "July 15, 2025",
      author: "Jane Smith"
    },
    {
      id: 3,
      title: "Benefits of Smart Home Technology",
      excerpt: "Explore how smart home gadgets can enhance your lifestyle and improve energy efficiency.",
      image: serviceimg,
      date: "July 10, 2025",
      author: "Emily Johnson"
    },
    {
      id: 4,
      title: "Benefits of Smart Home Technology",
      excerpt: "Explore how smart home gadgets can enhance your lifestyle and improve energy efficiency.",
      image: serviceimg,
      date: "July 10, 2025",
      author: "Emily Johnson"
    },
  ];
  