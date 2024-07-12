
import React, { useState } from 'react'
import Sidebar from '../../Common/Sidebar';

import MeetingTable from '../../Meetings/MeetingsTable';

import AssignMeetingForm from '../../Meetings/AssignMeetingsForm';


const MeetingsSystem = () => {
    const [isMeetingsFormOpen, setMeetingsFormOpen] = useState(false)

    const handleAssignMeetingClick = () => {
        setMeetingsFormOpen(true);
    }

    const handleToggleAssigneMeetingForm = () => {
        setMeetingsFormOpen(prevState => !prevState);
    }
    return (
        <>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />

                <div className=' bg-gray-300 relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <main>

                        <MeetingTable  />





                    </main>
                </div>
            </div>

        </>
    )
}

export default MeetingsSystem
