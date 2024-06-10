import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiToolsFill, RiOrganizationChart, RiDashboardLine } from "react-icons/ri";
import { LuUsers2, LuListTodo } from "react-icons/lu";
import { PiListChecks } from "react-icons/pi";
import ProfileMenue from './ProfileMenue';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '../../pages/AuthContext'; // Import the context


// Function to get the value of a cookie by name
const getCookieValue = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const Sidebar = () => {
  const { auth, logout } = useAuth();
  const isAdmin = getCookieValue('isAdmin') === 'true'; // Get auth information from context

  return (
    <aside className="flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700">
      <nav className="flex flex-col flex-1 space-y-6">
        <a href="#">
          <img className="w-auto h-6" src="https://merakiui.com/images/logo.svg" alt="" />
        </a>

        {isAdmin && (
          <NavLink to="/admin" className="p-1.5 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            <RiDashboardLine className='h-6 w-6' />
          </NavLink>
        )}

        {isAdmin && (
          <NavLink to="/company" className="p-1.5 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            <RiOrganizationChart className='h-6 w-6' />
          </NavLink>
        )}
        {!isAdmin && (
          <NavLink to="/User1" className="p-1.5 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            <RiDashboardLine className='h-6 w-6' />
          </NavLink>
        )}
        <NavLink to="/task" className="p-1.5 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
          <PiListChecks className='h-6 w-6' />
        </NavLink>

        <NavLink to="/todo" className="p-1.5 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
          <LuListTodo className='h-6 w-6' />
        </NavLink>

        <NavLink to="/user" className="p-1.5 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
          <LuUsers2 className='h-6 w-6' />
        </NavLink>

        <NavLink to="/tools" className="p-1.5 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
          <RiToolsFill className='h-6 w-6' />
        </NavLink>
      </nav>
      <div className="flex flex-col">
        <ProfileMenue />

        {/* Logout Button
         
         <button
          onClick={logout}
          className="mt-4 p-1.5 text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            <CiLogout />
          Logout
        </button> */}
      </div>
    </aside>
  );
};

export default Sidebar;
