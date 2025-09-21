import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <main className={`flex-1 ${isMobile ? 'ml-0' : 'ml-0'} transition-all duration-300`}>
        {/* Content with proper padding for mobile hamburger */}
        <div className={`${isMobile ? 'pt-16 px-4' : 'p-6'} transition-all duration-300`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;