import React from 'react'
import TaskCard from '../../Tool/TaskManagement/components/TaskCard'
import TaskTable from "../../Tasks/TaskTable"
import ProjectTable from '../../Projects/ProjectTable'
import MeetingsTable from '../../Meetings/MeetingsTable'

const TodoList = () => {
    return (
        <>
         <div data-testid="TodoListContainer">
            <div  data-testid="TaskCardContainer">
                <TaskCard />
            </div>
            <div data-testid="TaskTableContainer">
                <TaskTable />
            </div>
            <div data-testid="ProjectTableContainer">
                <ProjectTable />
            </div>
            <div data-testid="MeetingsTableContainer">
                <MeetingsTable />
            </div>
        </div>

        </>
    )
}

export default TodoList
