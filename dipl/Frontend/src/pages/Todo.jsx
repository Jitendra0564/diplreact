import React from 'react'
import Sidebar from '../components/Common/Sidebar';
import Navbar2 from '../components/Common/Navbar2';
import TodoList from '../components/Common/FloatingButton/TodoList';
const Todo = () => {
    return (
        <>

            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='bg-gray-100 relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <main>


                        <TodoList />
                    </main>

                </div>
            </div>
        </>
    )
}

export default Todo
