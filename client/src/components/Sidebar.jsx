import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation

const Sidebar = () => {
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
        {/* <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/completed-tasks">Completed Tasks</Link>
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/settings">Settings</Link>
        </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
