// src/app/components/LandingSlides.tsx
"use client"

import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: 'Manage Your Team and Clients in One Place',
    description: 'As a Project Manager/Admin, you can oversee projects, assign tasks, and onboard clients seamlessly.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Find the Right Talent for Your Creative Projects',
    description: 'Work with the best team for your creative tasks, all under one roof as a Creative Project owner',
    image: 'https://images.unsplash.com/photo-1532620161677-a1ca7d5d530f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Show Your Skills in the Creative Industry',
    description: 'As a Creative, contribute to exciting projects and showcase your expertise.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const LandingSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // Change slide every 4 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto" style={{ height: '66vh' }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            style={{ height: '66vh', objectFit: 'cover' }} // Set height here
          />
          <div className="absolute inset-0 bg-black opacity-30" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
            <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-lg text-center text-xl">{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingSlides;
