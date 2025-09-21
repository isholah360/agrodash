// components/Tracker.jsx
import React from 'react';
import { useState } from 'react';

const Tracker = () => {
  const [time, setTime] = useState('00:00:00');
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => setTime('00:00:00');

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Tracker</h3>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a1 1 0 00-.09.047l-2.1 1.05a1 1 0 00-.09.047A3 3 0 008 8a3 3 0 00-3 3v1a3 3 0 003 3h1a3 3 0 003-3V9a3 3 0 00-3-3zm0 1a1 1 0 011 1v1a1 1 0 01-1 1H8a1 1 0 01-1-1V9a1 1 0 011-1h7z" />
          </svg>
        </button>
      </div>
      <div className="text-4xl font-mono font-bold text-center mb-4">{time}</div>
      <div className="flex justify-center space-x-3">
        <button
          onClick={startTimer}
          className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center"
        >
          ▶
        </button>
        <button
          onClick={pauseTimer}
          className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center"
        >
          ■
        </button>
        <button
          onClick={resetTimer}
          className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"
        >
          ◀
        </button>
      </div>
      <div className="mt-4 space-y-2">
        {['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'].map((session, i) => (
          <div
            key={i}
            className={`flex justify-between p-3 rounded-lg ${
              ['bg-blue-100', 'bg-purple-100', 'bg-pink-100', 'bg-yellow-100', 'bg-green-100'][i]
            }`}
          >
            <span>{session}</span>
            <span className="font-mono">{['00:01:23', '00:02:45', '00:03:30', '00:04:12', '01:06:00'][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracker;