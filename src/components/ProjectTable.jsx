import React, { useState, useEffect } from 'react';

const ProjectTable = () => {
  const [isMobile, setIsMobile] = useState(false);

  const projects = [
    { name: 'Mike', status: 'In Progress', lead: '👤', priority: 'High', location: 'Oyo' },
    { name: 'Adebola', status: 'Not Started', lead: '👤', priority: 'Low', location: 'Ido' },
    { name: 'Bola', status: 'In Progress', lead: '👤', priority: 'High', location: 'Ojo' },
    { name: 'Tope', status: 'Completed', lead: '👤', priority: 'Low', location: 'Ibadan East' },
    { name: 'Bosun', status: 'In Progress', lead: '👤', priority: 'Medium', location: 'Eruwa' },
    { name: 'Lawal', status: 'Scheduled', lead: '👤', priority: 'Low', location: 'Ogbomoso' },
    { name: 'Bosun', status: 'Scheduled', lead: '👤', priority: 'Low', location: 'Ogbomoso' },
    { name: 'Kola', status: 'Scheduled', lead: '👤', priority: 'Low', location: 'Ogbomoso' },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };


  if (isMobile) {
    return (
      <div className="space-y-4">
        {projects.map((project, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-gray-900">{project.name}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyles(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Team Lead:</span>
                <span className="ml-2">{project.lead}</span>
              </div>
              <div>
                <span className="text-gray-500">Priority:</span>
                <span className={`ml-2 font-medium ${getPriorityStyles(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Location:</span>
                <span className="ml-2">{project.location}</span>
              </div>
            </div>
          </div>
        ))}
    
        <div className="flex flex-col items-center space-y-3 mt-6">
          <span className="text-sm text-gray-500">Showing 7 to 20 of 20 entries</span>
          <div className="flex space-x-1">
            <button className="px-2 py-1 text-sm border border-gray-300 rounded">Prev</button>
            <button className="px-3 py-1 text-sm bg-purple-500 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">2</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded">3</button>
            <button className="px-2 py-1 text-sm border border-gray-300 rounded">Next</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
     
      <div className="overflow-x-auto -mx-5 px-5">
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Officer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Team Lead</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Priority</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Location</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium whitespace-nowrap">{project.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getStatusStyles(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{project.lead}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium whitespace-nowrap ${getPriorityStyles(project.priority)}`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-600 whitespace-nowrap">{project.location}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Desktop Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-3 sm:space-y-0">
        <span className="text-sm text-gray-500">Showing 7 to 20 of 20 entries</span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600">1</button>
          <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700">2</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">3</button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;