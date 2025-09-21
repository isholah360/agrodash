
import React from 'react';

const ChartCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trends</h3>
      <div className="relative h-64">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            points="10,150 50,120 90,180 130,100 170,60 210,140 250,100 290,60 330,180 370,140"
          />
          <polygon
            fill="url(#grad1)"
            points="10,150 50,120 90,180 130,100 170,60 210,140 250,100 290,60 330,180 370,140 370,200 10,200"
          />
          <circle cx="10" cy="150" r="4" fill="#8B5CF6" />
          <circle cx="50" cy="120" r="4" fill="#8B5CF6" />
          <circle cx="90" cy="180" r="4" fill="#8B5CF6" />
          <circle cx="130" cy="100" r="4" fill="#8B5CF6" />
          <circle cx="170" cy="60" r="4" fill="#8B5CF6" />
          <circle cx="210" cy="140" r="4" fill="#8B5CF6" />
          <circle cx="250" cy="100" r="4" fill="#8B5CF6" />
          <circle cx="290" cy="60" r="4" fill="#8B5CF6" />
          <circle cx="330" cy="180" r="4" fill="#8B5CF6" />
          <circle cx="370" cy="140" r="4" fill="#8B5CF6" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;