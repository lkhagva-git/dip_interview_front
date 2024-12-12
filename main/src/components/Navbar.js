import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ setIsAuthenticated }) => {
  const { auth, logout } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const API_BASE_URL = 'http://localhost:8001/';

  return (
    <nav className="fixed top-0 z-50 w-full bg-indigo-400 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
              HR Interview system
            </span>
          </div>
          <div className="flex items-center relative">
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded={dropdownOpen}
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={API_BASE_URL + auth.profile.image_url}
                    alt="user profile"
                  />
                </button>
              </div>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-44 z-50 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      Тавтай морилно уу
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem">
                        Хувийн мэдээлэл
                      </Link>
                    </li>
                    <li>
                      <Link to="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                        onClick={logout}>
                        Гарах
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
