// src/app/components/LandingSlides.tsx
"use client"

import React, { useState } from 'react';

const slides = [
  {
    title: 'Manage Your Team and Clients in One Place',
    description: 'As an admin, you can oversee projects, assign tasks, and onboard clients seamlessly.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    title: 'Find the Right Talent for Your Creative Projects',
    description: 'As a client, work with the best team for your creative tasks, all under one roof.',
    image: 'https://plus.unsplash.com/premium_photo-1661281345831-72aac72beb52?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Show Your Skills in the Creative Industry',
    description: 'As a team member, contribute to exciting projects and showcase your expertise.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const LandingSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-full h-64 object-cover" />
        <div className="p-6 bg-white">
          <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
          <p className="mt-2">{slides[currentSlide].description}</p>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <button onClick={prevSlide} className="text-white bg-blue-500 px-4 py-2 rounded-l-lg">Prev</button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button onClick={nextSlide} className="text-white bg-blue-500 px-4 py-2 rounded-r-lg">Next</button>
      </div>
    </div>
  );
};

export default LandingSlides;
