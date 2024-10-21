import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 

const Sidebar = () => {
  const location = useLocation(); 

 
  if (location.pathname === '/' || location.pathname === '/register') {
    return null; 
  }

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4"></div>
      <ul>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/add-task">Add Task</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
