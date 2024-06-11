import React from 'react';
import { BsHouseAdd } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";

// Function to get the value of a cookie by name
const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

const Navbar2 = ({ isCompaniesPage, isTaskPage, isUserPage, isToolsPage, onSelectTool, onAddCompanyClick, onAddEmployeeClick, onAssignTaskClick}
     
) => {
    const isAdmin = getCookieValue('isAdmin') === 'true';
    return (
        <nav className="h-16 flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6  border-b rtl:border-l rtl:border-b-0 dark:bg-gray-100 dark:border-gray-300 shadow sm:items-baseline w-full">
            <div className="mb-2 sm:mb-0 inner">
            </div>
            <div class="sm:mb-0 self-center">
                {isCompaniesPage && (
                    <>
                        <div className='flex items-center justify-center'>

                            <li className='flex items-center p-2 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-100 dark:hover:bg-gray-300 hover:bg-gray-100 '>
                                <BsHouseAdd className='text-md font-semibold  text-gray-700' />
                                <a href="#" onClick={onAddCompanyClick} className="text-md font-semibold no-underline px-2 text-gray-700">Create Company</a>
                            </li>

                        </div>
                    </>
                )}
                {isTaskPage && (
                    <>
                        <div className='flex items-center justify-center'>

                            <li className='flex items-center p-2 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-100 dark:hover:bg-gray-300 hover:bg-gray-100 '>
                                <BsHouseAdd className='text-md font-semibold text-gray-700 ' />
                                <a href="#" className="text-md font-semibold no-underline px-2 text-gray-700" onClick={onAssignTaskClick}>Create Task</a>
                            </li>

                        </div>

                    </>
                )}
                {isUserPage && isAdmin && (
                    <>
                        <div className='flex items-center justify-center'>

                            <li className='flex items-center p-2 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-100 dark:hover:bg-gray-300 hover:bg-gray-100 '>
                                <BsHouseAdd className='text-md font-semibold  text-gray-700' />
                                <a href="#" className="text-md font-semibold no-underline px-2 text-gray-700" onClick={onAddEmployeeClick} >Create User</a>
                            </li>

                        </div>

                    </>
                )}
                {isToolsPage && (
                    <>
                        <div className='flex items-center justify-center'>
                            <li className='flex items-center p-2 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-100 dark:hover:bg-gray-300 hover:bg-gray-100 '>
                                {/* <BsHouseAdd className='text-md font-semibold ' /> */}
                                <a href="#" className="text-md font-semibold no-underline px-2 text-gray-700" onClick={() => onSelectTool('taskManagement')} ><FaTasks />
                                </a>

                            </li>
                            <li className='flex items-center p-2 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-100 dark:hover:bg-gray-300 hover:bg-gray-100'>
                                <a href="#" className="text-md font-semibold no-underline px-2 text-gray-700" onClick={() => onSelectTool('meetingsSystem')} ><HiOutlineUserGroup />
                                </a>
                            </li>
                        </div>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar2;
