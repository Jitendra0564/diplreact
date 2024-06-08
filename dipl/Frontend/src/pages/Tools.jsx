import React, { useState } from 'react';
import Sidebar from '../components/Common/Sidebar';
import Navbar2 from '../components/Common/Navbar2';
import { LuListTodo } from 'react-icons/lu';
import TaskManagement from '../components/Tool/TaskManagement/Taskmanajement';
import MeetingsSystem from '../components/Tool/Meetings/MeetingsSystem';

const Tools = ({ isToolspage }) => {
  const [selectedTool, setSelectedTool] = useState('');

  const handleSelectTool = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar />

        <div className='bg-gray-300 relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          <main>
            <Navbar2 isToolsPage={true} onSelectTool={handleSelectTool} />

            {/* Render selected tool component */}
            {selectedTool === 'taskManagement' && <TaskManagement />}
            {selectedTool === 'meetingsSystem' && <MeetingsSystem />}
          </main>

          {/* Floating Button */}

        </div>
      </div>
    </>
  );
};

export default Tools;
