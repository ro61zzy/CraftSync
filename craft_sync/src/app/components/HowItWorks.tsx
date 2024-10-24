// src/app/components/HowItWorks.tsx
import React from 'react';

const steps = [
  {
    title: 'Step 1: Create Company Profile',
    description: 'Admins sign up and create a company profile.',
  },
  {
    title: 'Step 2: Invite Team Members',
    description: 'Admins invite team members and clients to the platform.',
  },
  {
    title: 'Step 3: Assign and Submit Tasks',
    description: 'Admins assign tasks to team members, and clients submit tasks to the admin.',
  },
];

const HowItWorks = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 text-center mt-13">
      <h2 className="text-3xl font-bold mb-8 text-header">How CraftSync Works</h2>
      <div className="relative">
        <div className="flex flex-col space-y-10">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  {index + 1}
                </div>
                <div
                  className={`h-20 w-1 bg-primary absolute left-4 top-12 ${
                    index < steps.length - 1 ? 'border-l' : ''
                  }`}
                />
              </div>
              <div className="ml-8 bg-white p-6 rounded-lg shadow-md flex-1">
                <h3 className="text-xl font-bold mb-2 text-black">{step.title}</h3>
                <p className="text-gray-500 ">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
