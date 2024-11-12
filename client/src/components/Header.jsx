import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  
  const name = localStorage.getItem('name');

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/'); 
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState); // Toggle dropdown state
  };

  return (
    <header className="bg-gray-800 p-4 shadow flex items-center justify-between">
    <div className="flex items-center">
    <img 
      src="/images/tasky-logo.jpeg" 
      alt="Tasky Logo"
      className="h-8 w-8 mr-2" 
    />
   
  </div>

     
      {name ? (
        <div className="relative">
          {/* User name and dropdown toggle */}
          <button
            className="text-white px-4 py-2 flex items-center"
            onClick={toggleDropdown} // Only open dropdown on button click
          >
            Hi, {name} {/* Display user's name */}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && ( 
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      ) : (
        // Show Login button if user is not logged in
        <a
          href="/"
          className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Login
        </a>
      )}
    </header>
  );
};

export default Header;
