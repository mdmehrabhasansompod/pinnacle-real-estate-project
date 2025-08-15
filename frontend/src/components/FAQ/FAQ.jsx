import React from 'react'
import "./FAQ.css"
import { assets } from '../../assets/frontend_assets/assets'

const FAQ = () => {
  return (
    <div className='faq w-[90%] max-w-[1200px] mx-auto mt-24 px-4 md:px-0'>
      <h3 className='flex items-center text-white text-2xl md:text-3xl font-Gothic mb-12'>
        <img src={assets.faqvector} alt="" className='w-6 md:w-8 mr-2 md:mr-3' />
        Frequently Asked Questions
      </h3>

      <div className="faq-container border-[0.5px] border-amber-50 rounded-lg p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
        {[
          {
            question: "How long has Pinnacle been in business?",
            answer: "Pinnacle was founded in 2005, and we've been proudly serving the Mayobe area for over 15 years. During that time, we've established ourselves as a trusted leader in the construction and real estate industry, completing a wide range of projects and earning a reputation for excellence."
          },
          {
            question: "What types of services does Pinnacle offer?",
            answer: "At Pinnacle, we offer a comprehensive suite of services to meet the diverse needs of our clients. Our core offerings include residential construction, commercial construction, property management, and development services. Whether you're looking to build a custom home, renovate an existing property, or manage a commercial portfolio, our team of experts has the skills and experience to get the job done right."
          },
          {
            question: "How does Pinnacle ensure the quality of its work?",
            answer: "Quality is at the heart of everything we do at Pinnacle. We have a rigorous quality control process that involves regular inspections, testing, and oversight throughout the entire construction process. Additionally, our team of experienced professionals is committed to using only the highest-quality materials and adhering to the strictest industry standards. We stand behind our work with a comprehensive warranty, giving our clients the peace of mind they deserve."
          },
          {
            question: "What is Pinnacle's approach to sustainability?",
            answer: "Sustainability is a key priority for Pinnacle. We believe that building and managing properties in an environmentally responsible manner is not only good for the planet, but also benefits our clients in the long run. That's why we incorporate a range of sustainable practices into our projects, from energy-efficient design and construction to the use of renewable materials and technologies. Our goal is to create buildings and communities that are not only beautiful and functional, but also environmentally responsible."
          }
        ].map(({question, answer}, idx) => (
          <div
            key={idx}
            className="faqs border-[0.5px] border-white bg-black rounded-lg p-6 flex flex-col gap-5"
          >
            <p className='font-Gothic text-lg md:text-xl'>{question}</p>
            <p className='font-sans text-sm md:text-base leading-relaxed'>{answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
