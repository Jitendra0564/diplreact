import React, { useState } from 'react'
import Sidebar from '../components/Common/Sidebar'

import TaskTable from '../components/Tasks/TaskTable';

import AssignTaskForm from '../components/Tasks/AssignTaskForm';




const Task = () => {
    const [showAssignTaskForm, setShowAssignTaskForm] = useState(false)

    const handleAssignTaskClick = () => {
        setShowAssignTaskForm(true);
    }

    const handleToggleAssigneTaskForm = () => {
        setShowAssignTaskForm(prevState => !prevState);
    }
    return (
        <>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />

                <div className=' bg-gray-300 relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <main>

                        <TaskTable />





                    </main>
                </div>
            </div>

        </>
    )
}

export default Task
