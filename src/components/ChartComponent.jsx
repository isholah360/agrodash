import React from 'react';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = () => {
  // Sample data for the charts
  const lineData = [
    { month: 'January', value: 0 },
    { month: 'February', value: 10 },
    { month: 'March', value: 5 },
    { month: 'April', value: 2 },
    { month: 'May', value: 20 },
    { month: 'June', value: 30 }
  ];

  const barData = [
    { month: 'January', value: 65 },
    { month: 'February', value: 58 },
    { month: 'March', value: 80 },
    { month: 'April', value: 81 },
    { month: 'May', value: 55 },
    { month: 'June', value: 54 },
    { month: 'July', value: 40 }
  ];

  return (
    <div className=" bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">CHARTJS LINE CHART</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip 
                  formatter={(value) => [value, 'Value']} 
                  labelFormatter={(label) => label}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #d1d5db',
                    borderRadius: '4px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ 
                    marginTop: '20px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  dot={{ fill: '#4f46e5' }}
                  activeDot={{ r: 6, fill: '#4f46e5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">CHARTJS BAR CHART</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip 
                  formatter={(value) => [value, 'Value']} 
                  labelFormatter={(label) => label}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #d1d5db',
                    borderRadius: '4px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ 
                    marginTop: '20px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#9333ea"
                  radius={[4, 4, 0, 0]}
                  style={{
                    opacity: 0.8,
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  {barData.map((entry, index) => (
                    <cell key={`cell-${index}`} 
                      style={{
                        fill: ['#a78bfa', '#a855f7', '#f59e0b', '#6366f1', '#f97316', '#10b981', '#6b7280'][index % 7]
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;