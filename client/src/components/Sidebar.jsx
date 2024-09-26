import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4">Task Manager Sidebar</div>
      <ul>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">All Tasks</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Completed Tasks</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
