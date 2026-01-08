"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AnimateOnScroll from "./AnimateOnScroll"
import Image from "next/image";

const SLIDES = [
  {
    image: "Godrej Road Work.jpg",
    alt: "Industrial construction crane work by Shubh Construction in Gujarat",
  },
  {
    image: "Elantas RCC Road work.jpg",
    alt: "Commercial landscaping and civil construction project in Bharuch",
  },
  {
    image: "ETP & MEE.jpg",
    alt: "Top view of large-scale civil construction project by Shubh Construction",
  },
];


export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

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
    <section className="relative h-[600px] md:h-[700px] overflow-hidden w-full"
    role="banner">
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/45 z-10" />
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
          <div className="max-w-3xl text-white md:pt-2 pt-20">
            {/* Heading */}
            <AnimateOnScroll direction="left" delay={0.2}>
            <h1 className="md:mb-6 text-3xl  md:text-5xl lg:text-5xl font-bold leading-tight">
              Excellence in <span className="text-red-600">Every Brick </span>, Shaping <span className="text-red-600"> Your Vision.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mt-3 md:ml-10 px-12">
              Every detail is crafted with precision and care.
Your vision is transformed into strong, lasting structures.
            </p>
            </AnimateOnScroll>
            {/* CTA Buttons — FIXED POSITION */}
            <AnimateOnScroll direction="down" delay={0.6}>
            <div className="md:mt-12 mt-8 flex gap-4 md:flex-wrap items-center text-center flex-col md:flex-row px-10 md:px-20 ">
              <Link
                href="/contact-us"
                className="inline-flex text-center items-center w-64 md:w-auto shadow-2xl hover:shadow-xl active:scale-90 transition-all duration-300 bg-red-600 hover:bg-red-700  text-white md:px-6 px-16 py-3 rounded-full font-medium"
              >
                Start a Project →
              </Link>

              <Link
                href="/careers"
                className="inline-flex text-center bg-white/10 items-center w-65 border md:w-auto shadow-6xl hover:shadow-xl active:scale-90 transition-all duration-300 border-white/60 hover:bg-white hover:text-black md:px-6 px-16 py-3 rounded-full font-medium"
              >
                Join Our Team
              </Link>
              
            </div>
            </AnimateOnScroll>
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
                : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
