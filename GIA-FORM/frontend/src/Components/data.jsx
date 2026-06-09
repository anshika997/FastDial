 import React from 'react';
import icon1 from '../assets/icon1.svg';
import icon2 from '../assets/icon2.svg';
import icon3 from '../assets/icon3.svg';
import icon4 from '../assets/icon4.svg';

const features = [
  {
    icon: icon1,
    title: '2500 +',
    description: 'Learn More'
  },
  {
    icon: icon2,
    title: '2000 +',
    description: 'Happy Subscriptions'
  },
  {
    icon: icon3,
    title: '1500 +',
    description: 'Total Course'
  },
  {
    icon: icon4,
    title: '150 +',
    description: 'Mentors'
  }
];

function DataSection() {
  return (
    <div className="mb-30">
     <h2 className="text-4xl font-bold text-center text-white mt-12 mb-4">More Reason To Love Experience Pavilion</h2>
    <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      {features.map((feature, idx) => (
        <div key={idx} className="flex flex-col items-center p-4  hover:shadow-lg transition ">
          <img src={feature.icon} alt={`Icon ${idx + 1}`} className="h-12 w-12 mb-4" />
          <h3 className="text-2xl font-semibold mb-2 text-center text-white">
            {feature.title}
          </h3>
          <p className="text-sm text-center text-[#E55C3A]">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
    </div>
  );
  
}

export default DataSection;
