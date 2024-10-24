// src/app/page.tsx (Landing Page)
import React from 'react';
import LandingSlides from './components/LandingSlides';
import HowItWorks from './components/HowItWorks';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[var(--primary-color)] text-white p-6 text-center">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--header-color)' }}>
          Welcome to CraftSync
        </h1>
        <p className="mt-2 text-lg" style={{ color: 'var(--body-text-color)' }}>
          Manage your creative projects, team, and clients in one place
        </p>
        <a href="/auth/signup" className="bg-white text-[var(--primary-color)] px-4 py-2 mt-4 inline-block rounded-lg">
          Get Started
        </a>
      </header>

      <section className="mt-10">
        <LandingSlides />
      </section>

      <section className="mt-16">
        <HowItWorks />
      </section>

      <footer className="bg-gray-800 text-white p-6 text-center">
        <p style={{ color: 'var(--body-text-color)' }}>&copy; {new Date().getFullYear()} CraftSync. All rights reserved.</p>
      </footer>
    </div>
  );
}
