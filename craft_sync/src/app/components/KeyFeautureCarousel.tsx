// src/app/components/KeyFeatures.tsx
import React from 'react';

const keyFeatures = [
  {
    title: 'Collaboration',
    description: 'Work seamlessly with your team and clients.',
    icon: '🤝', // You can replace this with an actual icon
  },
  {
    title: 'Task Management',
    description: 'Assign, track, and complete tasks effectively.',
    icon: '✅', // You can replace this with an actual icon
  },
  {
    title: 'Analytics',
    description: 'Gain insights into project performance and team productivity.',
    icon: '📊', // You can replace this with an actual icon
  },
];

const KeyFeatures = () => {
  return (
    <section className="max-w-5xl mx-auto p-6 text-center ">
      <h2 className="text-3xl font-bold mb-8 text-header">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {keyFeatures.map((feature, index) => (
          <div
            key={index}
            className="bg-primary p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures;
