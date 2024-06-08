import React, { useState } from 'react';
import Sidebar from '../components/Common/Sidebar';
import UserTable from '../components/Users/UserTable';
import Navbar2 from '../components/Common/Navbar2';
import AddEmployeeForm from '../components/Users/AddEmployeeForm';


const Users = () => {
    const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);


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
                        <Navbar2 isUserPage={true} onAddEmployeeClick={handleAddEmployeeClick} />

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




