import AnimateOnScroll from '@/components/AnimateOnScroll';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import React from 'react'

const ExpInfo = [
  {
    title: "Completed Projects",
    value: "150+"
  },
  {
    title: "Years of Experience",
    value: "10+"
  },
  {
    title: "Satisfied Clients",
    value: "120+"
  },
  {
    title: "Timely Deliveries",
    value: "95%"
  }
];
const page = () => {
  return (
    <main>
      {/* Hero Section */}
            <section className="bg-[#1c1f26] pt-33 pb-16 bg-center bg-cover bg-no-repeat"
  style={{ backgroundImage: "url('/bg4.png')" }}>
              <AnimateOnScroll direction="down" delay={0.2}>
              <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Our Projects
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-3xl">
                  A showcase of quality construction
                </p>
              </div>
              </AnimateOnScroll>
            </section>
             {/*Experience Info Section*/}
      <section className="grid grid-cols-2 bg-gray-50 md:grid-cols-4 md:px-15 lg:px-40">
        {ExpInfo.map((item, index) => (
          <AnimateOnScroll direction="up" delay={0.2+ (index+1)*0.1} key={index} >
          <div key={index} className="container mx-auto px-4 py-10 text-center hover:scale-115 transition-all duration-400">
            <h2 className="text-4xl font-extrabold text-red-700 mb-2">{item.value}</h2>
            <p className="text-gray-400 text-md">{item.title}</p>
          </div>
          </AnimateOnScroll>
        ))}
      </section>
      {/* Projects Gallery Section */}
      <section>
        <AnimateOnScroll direction="up" delay={0.3}>
          <div className="text-center px-8 pt-16 md:pt-24 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold" id="projects-heading" >
              Featured Projects
            </h2>
            <p className="text-gray-500 md:px-40 lg:px-70 leading-relaxed text-lg">
              Explore our portfolio of successful construction projects delivered with excellence
            </p>
          </div>
          </AnimateOnScroll>
          <div>
            <ProjectCard />
          </div>
      </section>
      {/*Get in Touch*/}
      <section className="bg-gray-50 px-8 py-16 text-center space-y-3">
        <AnimateOnScroll direction="up" delay={0.2}>
        <h2 className="text-3xl font-bold md:text-4xl md:mb-4">Start Your Project With Us</h2>
        <p className="text-lg leading-relaxed text-gray-500 lg:mb-0">
         Ready to build something extraordinary? Contact us for a free consultation and quote.
        </p>
        <Link href="/contact-us" className="inline-block bg-red-600 text-white mt-5 px-8 py-3 text-lg rounded-xl shadow-xl
        hover:scale-115 hover:shadow-3xl hover:bg-red-700 transition-all active:scale-95 duration-300">
        Get in Touch
        </Link>
        </AnimateOnScroll>
      </section>
      
    </main>
  )
}

export default page