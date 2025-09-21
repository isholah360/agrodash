// components/TaskCard.jsx

import React from 'react';

const TaskCard = ({ title, progress, color, users }) => {
  const colors = {
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
  };
  const bgColor = colors[color] || colors.pink;

  return (
    <div className="mb-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <div className="flex -space-x-1">
          {[...Array(users)].map((_, i) => (
            <img
              key={i}
              src={`https://randomuser.me/api/portraits/women/${i}.jpg`}
              alt="User"
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ))}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div className={`h-2 rounded-full ${bgColor}`} style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{progress}%</span>
        <span>+{progress}%</span>
      </div>
    </div>
  );
};

export default TaskCard;