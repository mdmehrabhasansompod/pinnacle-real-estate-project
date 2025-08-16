import logo from "./logo.png"
import Headerstar1 from "./Headerstar1.png"
import Headerstar2 from "./Headerstar2.png"
import Headerbuilding from "./Headerbuilding.png"
import vector from "./vector.png"
import building from "./building.png"
import flyershape from "./flyer-shape.png"
import flyerRating from "./flyerRating.png"
import projectvector from "./projectvector.png"
import project1 from "./project1.png"
import project2 from "./project2.png"
import project3 from "./project3.png"
import project4 from "./project3.png"
import project5 from "./project2.png"
import project6 from "./project1.png"
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
import blackVector from "./blackVector.png"
import uppervector from "./uppervector.png"
import lowervector from "./lowervector.png"
import aboutHeroImg1 from "./about-hero1.png"
import aboutHeroImg2 from "./about-hero2.png"
import ceoIMG from "./ceoIMG.png"
import achievementAbout from "./achievementAbout.png"
import teamVector from "./teamVector.png"
import tm2 from "./tm2.png"
import tm3 from "./tm3.png"
import tm4 from "./tm4.png"
import serviceHero from "./service-hero.png"
import service1 from "./service1.png"
import service2 from "./service2.png"
import service3 from "./service3.png"
import serviceContact from "./cb-contact.png"


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
    project1,
    project2,
    project3,
    project4,
    project5,
    project6,
    NewsVector,
    faqvector,
    blackVector,
    uppervector,
    lowervector,
    aboutHeroImg1,
    aboutHeroImg2,
    ceoIMG,
    achievementAbout,
    teamVector,
    tm2,
    tm3,
    tm4,
    Client1,
    Client2,
    Client3,
    Client4,
    serviceHero,
    service1,
    service2,
    service3,
    serviceContact,


    
}


// src/assets/frontend_assets/projectsData.js


// Array with project details and USA locations
export const projectsData = [
  {
    id: 1,
    title: 'Sunset Villas',
    description: 'Luxury villas with modern architecture in California.',
    location: 'Los Angeles, USA',
    speciality: 'Residential',
    image: assets.project1,
  },
  {
    id: 2,
    title: 'Downtown Office Complex',
    description: 'State-of-the-art commercial office spaces in NYC.',
    location: 'New York, USA',
    speciality: 'Commercial',
    image: assets.project2,
  },
  {
    id: 3,
    title: 'Riverside Apartments',
    description: 'Affordable yet stylish apartments near Chicago River.',
    location: 'Chicago, USA',
    speciality: 'Residential',
    image: assets.project3,
  },
  {
    id: 4,
    title: 'Silicon Tech Hub',
    description: 'High-tech office buildings in Silicon Valley.',
    location: 'San Francisco, USA',
    speciality: 'Commercial',
    image: assets.project4,
  },
  {
    id: 5,
    title: 'Beachfront Condos',
    description: 'Modern condos with ocean views in Miami.',
    location: 'Miami, USA',
    speciality: 'Residential',
    image: assets.project5,
  },
  {
    id: 6,
    title: 'Mountain Retreat',
    description: 'Luxury cabins and resorts in Colorado Rockies.',
    location: 'Denver, USA',
    speciality: 'Hospitality',
    image: assets.project6,
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
  