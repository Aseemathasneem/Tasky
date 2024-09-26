import React from 'react';

const Header = () => {
  return (
    <header>
      {/* Navigation Bar */}
      <nav
        aria-label="menu nav"
        className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0"
      >
        <div className="flex flex-wrap items-center">
          {/* Left Logo Section */}
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
            <a href="/" aria-label="Home">
              <span className="text-xl pl-2">
                <i className="em em-grinning"></i>
              </span>
            </a>
          </div>

          {/* Right Section with Links and Dropdown */}
          <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="flex-1 md:flex-none md:mr-3">
                <a className="inline-block py-2 px-4 text-white no-underline" href="#">
                  Active
                </a>
              </li>
              <li className="flex-1 md:flex-none md:mr-3">
                <a className="inline-block text-gray-400 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">
                  Link
                </a>
              </li>

              {/* Dropdown Menu */}
              <li className="flex-1 md:flex-none md:mr-3">
                <div className="relative inline-block">
                  <button className="drop-button text-white py-2 px-2">
                    <span className="pr-2">
                      <i className="em em-robot_face"></i>
                    </span>
                    Hi, User
                    <svg
                      className="h-3 fill-current inline"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </button>

                  {/* Dropdown Content */}
                  <div
                    id="myDropdown"
                    className="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto z-30 invisible"
                  >
                    <a
                      href="#"
                      className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"
                    >
                      <i className="fa fa-user fa-fw"></i> Profile
                    </a>
                    <a
                      href="#"
                      className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"
                    >
                      <i className="fa fa-cog fa-fw"></i> Settings
                    </a>
                    <div className="border border-gray-800"></div>
                    <a
                      href="#"
                      className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"
                    >
                      <i className="fas fa-sign-out-alt fa-fw"></i> Log Out
                    </a>
                  </div>
                </div>
              </li>

              {/* Login Button */}
              <li className="flex-1 md:flex-none md:mr-3">
                <a
                  className="inline-block bg-blue-500 text-white no-underline hover:bg-blue-700 py-2 px-4 rounded"
                  href="/login"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
