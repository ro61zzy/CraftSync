// src/app/page.tsx (Landing Page)
import React from "react";
import LandingSlides from "./components/LandingSlides";
import HowItWorks from "./components/HowItWorks";
import KeyFeaturesCarousel from "./components/KeyFeautureCarousel";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white p-6 text-center">
        <h1 className="text-6xl font-bold text-white">Welcome to CraftSync</h1>
        <p className="mt-4 text-xl text-white">
          Manage your creative projects, team, and clients in one place
        </p>
        <a
          href="/auth/signup"
          className="bg-white text-primary px-20 py-2 mt-7 inline-block rounded-lg text-2xl"
        >
          Get Started
        </a>
      </header>

      <section className="mt-10">
        <LandingSlides />
      </section>

      <section className="bg-gray-200 py-12 text-center mt-7">
        <h2 className="text-4xl font-bold mb-4 text-header">
          Join CraftSync Today!
        </h2>
        <p className="mb-12 text-2xl text-black">
          Experience seamless project management, collaboration, and
          communication.
        </p>
        <a
          href="/auth/signup"
          className="bg-primary text-white px-16 py-3 rounded-lg text-2xl "
        >
          Sign Up Now
        </a>
      </section>

      <section className="max-w-5xl mx-auto p-6">
        <KeyFeaturesCarousel />
      </section>

      <section className=" mb-10">
        <HowItWorks />
      </section>

      <footer className="bg-primary text-white p-6 text-center">
        <p className="text-white">
          &copy; {new Date().getFullYear()} CraftSync. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
