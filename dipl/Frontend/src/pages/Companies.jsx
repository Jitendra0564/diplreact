import React, { useState } from 'react';
import Sidebar from '../components/Common/Sidebar';
import CompaniesTable from '../components/Companies/CompaniesTable';

import AddCompaniesForm from '../components/Companies/AddCompaniesForm';


const Companies = ({ isCompaniesPage, isTaskPage }) => {
    const [showAddCompanyForm, setShowAddCompanyForm] = useState(false);

    const handleAddCompanyClick = () => {
        setShowAddCompanyForm(true);
    };

    // Function to handle toggling the visibility of the form component
    const handleToggleAddCompanyForm = () => {
        setShowAddCompanyForm(prevState => !prevState);
    };

    return (
        <>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='bg-gray-300 relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <main>

                        <CompaniesTable />

                    </main>

                </div>
            </div>
        </>
    );
};

export default Companies;
