"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Explorer la linguistique",
    description: "Plongez dans le monde fascinant de la linguistique française grâce à nos cours complets.",
    cta: "Explorer la linguistique",
    link: "/linguistics",
    image: "/linguistique.jpg?height=600&width=1200",
  },
  {
    id: 2,
    title: "Découvrez la littérature française",
    description: "De la littérature classique à la littérature contemporaine, explorez le riche héritage de la littérature française.",
    cta: "Découvrir la littérature",
    link: "/literature",
    image: "/Litterature.jpg?height=600&width=1200",
  },
  {
    id: 3,
    title: "Préparez vos examens",
    description: "Accédez à des sujets d’examens passés et à des supports d’étude pour exceller dans vos examens de français. ",
    cta: "Voir Exams",
    link: "/exams",
    image: "/carousel1.jpg?height=600&width=1200",
  },
  {
    id: 4,
    title: "Testez vos connaissances",
    description: " Mettez-vous au défi avec nos quiz interactifs sur la langue et la littérature françaises.",
    cta: "Commencer un Quiz",
    link: "/quiz",
    image: "/carousel2.jpg?height=600&width=1200",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const slideRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const x = e.clientX
    const diff = startX - x

    if (diff > 50) {
      nextSlide()
      setIsDragging(false)
    } else if (diff < -50) {
      prevSlide()
      setIsDragging(false)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].clientX
    const diff = startX - x

    if (diff > 50) {
      nextSlide()
      setIsDragging(false)
    } else if (diff < -50) {
      prevSlide()
      setIsDragging(false)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        ref={slideRef}
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className=" object-cover" />
            <div className="absolute inset-0 backdrop-brightness-50 flex items-center justify-center">
              <div className="text-center text-white p-4 max-w-xl" data-aos='fade-down'>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg mb-6">{slide.description}</p>
                <Link
                  href={slide.link}
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30  rounded-full p-2 text-blue-600 hover:bg-[#0e2d6d]
         hover:text-white cursor-pointer"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 rounded-full p-2  hover:bg-[#0e2d6d]
         hover:text-white cursor-pointer"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-[#0e2d6d]" : "bg-white bg-opacity-50"}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

