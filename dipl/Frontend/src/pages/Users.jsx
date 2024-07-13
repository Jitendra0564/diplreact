import React, { useState } from 'react';
import Sidebar from '../components/Common/Sidebar';
import UserTable from '../components/Users/UserTable';
import AddEmployeeForm from '../components/Users/AddEmployeeForm';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
    const navigate = useNavigate();

    const handleAddEmployeeClick = () => {
        setShowAddEmployeeForm(true);
    };

    const handleToggleAddEmployeeForm = () => {
        setShowAddEmployeeForm(prevState => !prevState);
    };


    return (
        <>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='bg-gray-300 relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <main>
                      <button
                onClick={() => navigate("/todo")}
                className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 p-4 mx-4 my-4"
              >
                Back
              </button>

                        {/* Conditionally render the AddEmployeeForm or UserTable based on state */}
                        {showAddEmployeeForm ? (
                            <AddEmployeeForm onBack={() => handleToggleAddEmployeeForm()} />
                        ) : (
                            <UserTable />
                        )}
                    </main>

                </div>
            </div>
        </>
    );
};

export default Users;




