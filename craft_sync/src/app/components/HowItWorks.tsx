// src/app/components/HowItWorks.tsx
import React from 'react';

const HowItWorks = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold mb-8">How CraftSync Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Step 1</h3>
          <p>Admins sign up and create a company profile.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Step 2</h3>
          <p>Admins invite team members and clients to the platform.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Step 3</h3>
          <p>Admins assign tasks to team members, and clients submit tasks to the admin.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
