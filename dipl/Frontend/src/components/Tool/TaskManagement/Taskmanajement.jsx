import React from 'react'
import TaskCard from './components/TaskCard'
import TaskTable from "../../Tasks/TaskTable"
import ProjectTable from '../../Projects/ProjectTable'
import MeetingsTable from '../../Meetings/MeetingsTable'

const Taskmanajement = () => {
    return (
        <>
            <div>
                <TaskCard />
            </div>
            <div >
                <TaskTable />
            </div>
            <div>
                <ProjectTable />
            </div>
            <div>
                <MeetingsTable />
            </div>


        </>
    )
}

export default Taskmanajement
