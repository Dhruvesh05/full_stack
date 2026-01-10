"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AnimateOnScroll from "./AnimateOnScroll"
import Image from "next/image";
import { Phone } from "lucide-react";

const SLIDES = [
  {
    image: "Bharat_Talpada1.jpg",
    alt: "Industrial construction crane work by Shubh Construction in Gujarat",
    text: "Good buildings come from good people, and all problems are solved by good design",
    name: "Bharat Talpada",
    designation: "Founder",
    phone: "+91 91069 40724",
    email: "bharat@shubhconstruction.com",
    direction: "ltr",
  },
  {
    image: "Jagdish_Vaghela.jpg",
    alt: "Industrial construction crane work by Shubh Construction in Gujarat",
    text: "An idea is salvation by imagination",
    name: "Jagdish Vaghela",
    designation: "Billing & Planning Engineer",
    phone: "+91 99096 83275",
    email: "jagdish@shubhconstruction.com",
    direction: "rtl",
  },
  {
    image: "Amar_Singh1.jpg",
    alt: "Industrial construction crane work by Shubh Construction in Gujarat",
    text: "The sun never knew how great it was until it hit the side of a building",
    name: "Amar Singh",
    designation: "Site Incharge",
    phone: "+91 87564 59152",
    email: "amar@shubhconstruction.com",
    direction: "ltr",
  },
  // {
  //   image: "Godrej Road Work.jpg",
  //   alt: "Industrial construction crane work by Shubh Construction in Gujarat",
  // },
  // {
  //   image: "Elantas RCC Road work.jpg",
  //   alt: "Commercial landscaping and civil construction project in Bharuch",
  // },
  // {
  //   image: "ETP & MEE.jpg",
  //   alt: "Top view of large-scale civil construction project by Shubh Construction",
  // },
];


export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);


  /* Auto Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length)
  const prev = () =>
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

  return (
    <section
      className="relative h-[600px] md:h-[700px] overflow-hidden w-full"
      role="banner"
    >
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 z-10" />
          <div className="md:h-20 bg-red-700 w-full"></div>
          <Image
            src={`/projects_photo/${slide.image}`}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 flex h-full items-center">
        <div className="w-full px-4 md:px-6">
          <div className="md:pt-2 pt-20 ">
            {/* Heading */}
            <div className="md:pt-2 pt-20">
              <style jsx>{`
                @keyframes slideInLeft {
                  from {
                    opacity: 0;
                    transform: translateX(-40px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
              `}</style>

              {mounted && (
                <p
                  key={current}
                  style={{
                    animation: "slideInLeft 0.7s ease-out 0.2s both",
                  }}
                  className={`
            text-lg md:text-3xl ml-24 mx-12
            text-black font-extrabold leading-relaxed
            md:text-left
            md:ml-[5rem]
            ${current !== 1 ? "md:ml-[45%]" : ""}
          `}
                >
                  {SLIDES[current].text}
                </p>
              )}
            </div>
            {/* PERSON INFO BAR */}
            {mounted && (
              <div
                className={`
                  mt-26
          md:mt-6
          md:absolute md:bottom-20
          text-left
          ${current !== 1 && "pl-46"}
          md:ml-[8rem]
          ${current !== 1 ? "md:ml-[55%]" : ""}
        `}
                key={current}
                style={{
                  animation: "slideInLeft 0.7s ease-out 0.6s both",
                }}
              >
                <div
                  className="flex flex-col gap-x-6
                  px-6"
                >
                  <span className="font-semibold text-white">
                    {SLIDES[current].name}
                  </span>

                  <span className="text-sm  text-gray-300">
                    {SLIDES[current].designation}
                  </span>

                  <span className="flex items-center gap-2 text-sm text-white">
                    <Phone color="white" size={14} /> {SLIDES[current].phone}
                  </span>

                  <span className="text-sm text-white">
                    ✉ {SLIDES[current].email}
                  </span>
                </div>
              </div>
            )}

            {/* CTA Buttons — FIXED POSITION */}
            {/* <AnimateOnScroll direction="down" delay={0.6}>
              <div className="absolute bottom-36 left-[45%] z-30 flex gap-4 md:flex-wrap items-center text-center flex-col md:flex-row px-10 md:px-20 ">
                <Link
                  href="/contact-us"
                  className="inline-flex text-center items-center w-64 md:w-auto shadow-2xl hover:shadow-xl active:scale-90 transition-all duration-300 bg-red-600 hover:bg-red-700  text-white md:px-6 px-16 py-3 rounded-full font-medium"
                >
                  Start a Project →
                </Link>

                <Link
                  href="/careers"
                  className="inline-flex text-center text-white bg-white/40 backdrop-blur-sm  items-center w-65 border md:w-auto shadow-6xl hover:shadow-xl active:scale-90 transition-all duration-300 border-white/60 hover:bg-white hover:text-black md:px-6 px-16 py-3 rounded-full font-medium"
                >
                  Join Our Team
                </Link>
              </div>
            </AnimateOnScroll> */}
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute  left-2 sm:left-6 top-1/2  -translate-y-1/2 z-30 w-12 h-12 active:scale-90 transition-all duration-300 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white text-2xl"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 sm:right-6 top-1/2 active:scale-90 transition-all duration-300 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white text-2xl"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8  left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            aria-current={index === current ? "true" : undefined}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? "w-8 bg-red-500"
                : "w-2 bg-black/50 hover:bg-black"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
