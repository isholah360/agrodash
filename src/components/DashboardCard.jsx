// components/DashboardCard.jsx
import React from 'react';

const DashboardCard = ({ 
  title, 
  value, 
  subtitle, 
  emoji, 
  icon, 
  progress, 
  color, 
  tag, 
  avatarCount,
  timeLeft,
  emptyState,
  image,
  chatPreview
}) => {
  const colors = {
    blue: 'bg-blue-50 border-blue-200',
    indigo: 'bg-indigo-50 border-indigo-200',
    gray: 'bg-gray-50 border-gray-200',
    purple: 'bg-purple-50 border-purple-200',
    green: 'bg-green-50 border-green-200',
    pink: 'bg-pink-50 border-pink-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    lime: 'lime-200 border-yellow-200',
  };

  const borderColor = colors[color] || colors.blue;

  return (
    <div className={`${borderColor} rounded-xl p-5 border-dashed h-[15rem] shadow-sm relative `}>
      {emptyState ? (
        <div className="text-center py-6">
          <div className="text-3xl mb-2">{emoji}</div>
          <h3 className="text-lg font-medium text-blue-600">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg md:sm font-bold text-gray-700">{title}</h3>
            {icon && <span className="text-xl">{icon}</span>}
          </div>
          <div className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">{value}</div>
          {subtitle && <p className="text-5xl py-5 absolute right-3  text-gray-500 mb-4 display:none">{emoji}</p>}

          {tag && (
            <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
              {tag}
              
            </div>
            
          )}


          {avatarCount && (
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1">
                {[...Array(avatarCount)].map((_, i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
                    alt="User"
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">{timeLeft}</span>
            </div>
          )}

          {image && (
            <div className="mt-4 relative">
              <img src={image} alt="Avatar" className="w-16 h-16 rounded-full mx-auto" />
              <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                👤
              </div>
            </div>
          )}

          {chatPreview && (
            <div className="mt-4 space-y-3">
              {chatPreview.map((msg, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <img src={`https://randomuser.me/api/portraits/women/${i}.jpg`} alt="User" className="w-6 h-6 rounded-full" />
                  <div>
                    <div className="text-sm font-medium">{msg.name}</div>
                    <div className="text-xs text-gray-500">{msg.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardCard;