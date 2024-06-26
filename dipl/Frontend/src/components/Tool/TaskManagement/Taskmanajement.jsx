import React from 'react'
import TaskCard from './components/TaskCard'
import TaskTable from "../../Tasks/TaskTable"
import ProjectTable from '../../Projects/ProjectTable'
import MeetingsTable from '../../Meetings/MeetingsTable'

const Taskmanajement = () => {
    return (
        <>
            <div data-testid="task-card">
                <TaskCard />
            </div>
            <div data-testid="task-table">
                <TaskTable />
            </div >
            <div data-testid="project-table">
                <ProjectTable />
            </div>
            <div data-testid="meetings-table">
                <MeetingsTable />
            </div>


        </>
    )
}

export default Taskmanajement
