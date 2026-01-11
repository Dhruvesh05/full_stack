"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Building2,
  Home,
  Factory,
  Wrench,
  Users,
  Building,
  Award,
  Clock,
  CheckCircle2,
} from "lucide-react"

function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative h-[600px] md:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/40 z-10" />
        <img 
          src="/home.png" 
          alt="Modern Construction Building" 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
        <div className={`max-w-3xl text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Building Dreams Into Reality
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Professional residential construction with quality craftsmanship and timely delivery
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link 
              href="/Contact-Us"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200"
            >
              Get Started <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link 
              href="/Project"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold px-6 py-3 rounded-md transition-all duration-200"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const services = [
    { icon: Home, title: "Residential Construction", description: "Custom homes and villas." },
    { icon: Building2, title: "Commercial Buildings", description: "Office & retail spaces." },
    { icon: Factory, title: "Industrial Projects", description: "Factories & warehouses." },
    { icon: Wrench, title: "Renovations", description: "Remodeling & upgrades." },
  ]

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold text-center mb-12 text-black transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"        >
          {services.map((s, index) => (
            <div 
              key={s.title}
              className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl  hover:scale-105 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <s.icon className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2 text-black">{s.title}</h3>
              <p className="text-black">{s.description}</p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-10 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Link 
            href="/Services"
            className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-200"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const stats = [
    { icon: Building, value: "150+", label: "Projects Completed" },
    { icon: Users, value: "200+", label: "Happy Clients" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Clock, value: "98%", label: "On-Time Delivery" },
  ]

  return (
    <section ref={sectionRef} className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, index) => (
          <div 
            key={s.label} 
            className={`text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <s.icon size={32} className="mx-auto mb-4 text-red-600" />
            <div className="text-4xl font-bold">{s.value}</div>
            <div>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const features = [
    "Experienced engineers & skilled workers",
    "High-quality materials",
    "Transparent pricing",
    "Timely delivery",
    "End-to-end project management",
    "Safety-first approach",
  ]

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          <h2 className="text-4xl font-bold mb-6 text-black">Why Choose Us</h2>
          <ul className="space-y-4">
            {features.map((f, index) => (
              <li 
                key={f} 
                className={`flex gap-3 items-start transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CheckCircle2 className="text-red-600 mt-1 flex-shrink-0" size={20} />
                <span className="text-black">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          <img
            src="/modern-construction-building.jpg"
            alt="Construction Team"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <WhyChooseUsSection />
    </>
  )
}
