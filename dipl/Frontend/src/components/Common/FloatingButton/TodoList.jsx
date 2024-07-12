import React from 'react'
import TaskCard from '../../Tool/TaskManagement/components/TaskCard'
import TaskTable from "../../Tasks/TaskTable"
import ProjectTable from '../../Projects/ProjectTable'
import MeetingsTable from '../../Meetings/MeetingsTable'

const TodoList = () => {
    return (
        <>
            <div>
                <TaskCard />
            </div>
            <div >
                <TaskTable />
            </div>
            <div>
                <MeetingsTable />
            </div>
            <div>
                <ProjectTable />
            </div>
            


        </>
    )
}

export default TodoList
