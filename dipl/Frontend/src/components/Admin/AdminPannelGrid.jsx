import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Modal, Box, Button } from '@mui/material';
import personalscore from "../../assets/personalscore.png"
import ptasks from "../../assets/ptask.png"
import ttasks from "../../assets/totaltask.png"
import umeetings from "../../assets/upcommingmettings.png"
import meeting from "../../assets/meetings.png"
import etask from "../../assets/etask.png"
import temployees from "../../assets/temployees.png"
import totalptask from "../../assets/totalptask.png"
import completedtask from "../../assets/completedtask.png"
import rtcomplition from "../../assets/rtcomplition.png"


const AdminPannelGrid = () => {

    const [totalTasks, setTotalTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [expiredTasks, setExpiredTasks] = useState([]);
    const [InProgressTasks, setInProgress] = useState([]);
    const [totalEmployees, setTotalEmployees] = useState([]);
    const [totalCompanies, setTotalCompanies] = useState([]);
    const [visibleTaskList, setVisibleTaskList] = useState(null);
    const [completionRate, setCompletionRate] = useState(0);


    // Function to get the value of a cookie by name
    const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const isAdmin = getCookieValue('isAdmin') === 'true';
    const token = getCookieValue('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tasksResponse, employeesResponse, companiesResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/tasks', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:5000/api/users', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:5000/api/companies', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const allTasks = tasksResponse.data;
                setTotalTasks(allTasks);
                setCompletedTasks(allTasks.filter((task) => task.status === 'Completed'));
                
                setPendingTasks(allTasks.filter((task) => task.status === 'Pending'));
                setExpiredTasks(allTasks.filter((task) => task.status === 'Cancelled'));
                setInProgress(allTasks.filter((task) => task.status === 'In Progress'));
                setCompletionRate((completedTasks.length / allTasks.length) * 100);
                const allemployees = employeesResponse.data
                setTotalEmployees(allemployees);
                const allcompanies = companiesResponse.data
                setTotalCompanies(allcompanies);
                

            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, [isAdmin, token]);
    
    useEffect(() => {
        setCompletionRate((completedTasks.length / totalTasks.length) * 100);
    }, [completedTasks, totalTasks]);

    const renderTaskTitles = (tasks = [], users = [], companies = []) => {
        return (
            <>
                {tasks && tasks.map((task, index) => (
                    <div key={task._id} className="mb-2">
                        <Typography variant="body1">{`${index + 1}. ${task.title}`}</Typography>
                        <Typography variant="body2" style={{ fontWeight: 'bold', color: 'black' }}>{task.description}</Typography>

                    </div>
                ))}
                {users && users.map((user, index) => (
                    <div key={user._id} className="mb-2">
                        <Typography variant="body1">{`${index + 1}. ${user.name}`}</Typography>
                        <Typography variant="body2">{user.email}</Typography>
                    </div>
                ))}
                {companies && companies.map((company, index) => (
                    <div key={company._id} className="mb-2">
                        <Typography variant="body1" style={{ fontWeight: 'bold', color: 'blue' }}>{`${index + 1}. ${company.name}`}</Typography>
                    </div>
                ))}
            </>
        );
    };


    const toggleTaskList = (listType) => {
        setVisibleTaskList(listType);
    };

    const closeModal = () => {
        setVisibleTaskList(null);
    };

    return (
        <>
            <section className="py-20 bg-gray-300 h-full">
                <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        <ul className="space-y-8">
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg  ring-1 bg-white shadow-lg hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={ttasks}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-black"> {isAdmin ? 'Total Tasks' : 'Tasks Assigned to You'}</h3>
                                                        <p className="text-gray-500 text-md">Admin &amp; Employee</p>
                                                    </div>
                                                </div>
                                                <h4 className=" text-gray-500 font-bold text-xl"> {totalTasks.length}</h4>
                                                <Button
                                                    className="w-full text-purple-600 bg-purple-100 hover:bg-purple-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                                                    onClick={() => toggleTaskList('total')}
                                                >
                                                    View List
                                                </Button>
                                            </div>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"><img
                                                src={personalscore}
                                                clasName="w-15 h-12 bg-center bg-cover " alt="Score" />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-black">personal score</h3>
                                                    <p className="text-gray-500 text-md">Admin Score</p>
                                                </div>
                                            </div>


                                            <h1 className=" text-gray-900 font-bold text-8xl text-center ">99<span className="text-sm font-bold">%</span></h1>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={ptasks}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-black">Pending Tasks</h3>
                                                        <p className="text-gray-500 text-md"> Employee</p>
                                                    </div>
                                                </div>

                                                <h4 className=" text-gray-500 font-bold text-xl"> {pendingTasks.length}</h4>
                                                <Button
                                                    className="w-full text-red-600 bg-red-100 hover:bg-red-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                                                    onClick={() => toggleTaskList('Pending')}
                                                >
                                                    View List
                                                </Button>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg bg-white shadow-lg ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"><img
                                                src={umeetings}
                                                clasName="w-15 h-12 bg-center bg-cover " alt="Score" />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-black">Upcomming Meetings</h3>
                                                    <p className="text-gray-500 text-md">Your Meetings</p>
                                                </div>
                                            </div>


                                            <h1 className=" text-gray-900 font-bold text-8xl text-center ">8<span className="text-sm font-bold">-Only</span></h1>

                                        </div>
                                    </a>
                                </div>
                            </li>
                        </ul>


                        <ul className="hidden space-y-8 sm:block">
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" className="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={meeting}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-balck">Total Meetings</h3>
                                                        <p className="text-gray-500 text-md">Held Meetings</p>
                                                    </div>
                                                </div>

                                                <h4 className=" text-gray-500 font-bold text-xl">10</h4>


                                            </div>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={etask}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-dark">Expired Tasks</h3>
                                                        <p className="text-gray-500 text-md"> Employee</p>
                                                    </div>
                                                </div>

                                                <h4 className=" text-gray-500 font-bold text-xl">{expiredTasks.length}</h4>
                                                <Button
                                                    className="w-full text-red-600 bg-red-100 hover:bg-red-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                                                    onClick={() => toggleTaskList('Cancelled')}
                                                >
                                                    View List
                                                </Button>

                                            </div>

                                        </div>
                                    </a>
                                </div>
                            </li>
                            {isAdmin && (
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"><img
                                                src={temployees}
                                                clasName="w-15 h-12 bg-center bg-cover " alt="Score" />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-dark">Total Employees</h3>
                                                    <p className="text-gray-500 text-md">Employee number-</p>
                                                </div>
                                            </div>


                                            <h1 className=" text-gray-900 font-bold text-8xl text-center ">{totalEmployees.length}<span className="text-sm font-bold">-Only</span></h1>
                                            <Button
                                                className="w-full text-blue-600 bg-blue-100 hover:bg-blue-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                                                onClick={() => toggleTaskList('Employees')}
                                            >
                                                View List
                                            </Button>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            )}
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-4">

                                                <div className='flex items-center'>
                                                    <img
                                                        src={totalptask}
                                                        class="w-12 h-10 bg-center bg-cover " alt="Tasks" />
                                                    <div className='p-3'>

                                                        <h3 className="text-lg font-semibold text-black">Total In Progress Tasks</h3>
                                                        <p className="text-gray-500 text-md"> Employee</p>
                                                    </div>
                                                </div>
                                                <h4 className=" text-gray-500 font-bold text-xl">{InProgressTasks.length}</h4>
                                                <Button
                                                    className="w-full text-red-600 bg-red-100 hover:bg-red-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                                                    onClick={() => toggleTaskList('In Progress')}
                                                >
                                                    View List
                                                </Button>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <ul className="hidden space-y-8 lg:block">
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white hover:bg-gray-100 ring-1 ring-gray-900/5">
                                            <div className="flex items-center space-x-4"><img
                                                src={rtcomplition}
                                                className="w-15 h-12 bg-center bg-cover" alt="Score" />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-black">Rate Of Task Completion</h3>
                                                    <p className="text-gray-500 text-md">Completion Rate</p>
                                                </div>
                                            </div>
                                            <h1 className=" text-gray-900 font-bold text-8xl text-center ">{Math.round(completionRate)}<span className="text-sm font-bold">%</span></h1>
                                        </div>
                                    </a>
                                </div>

                            </li>
                            <li className="text-sm leading-6">
                                <div className="relative group">
                                    <a href="#" class="cursor-pointer">
                                        <div
                                            className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white  hover:bg-gray-100 ring-1 ring-gray-900/5">
                                            <div className="flex items-center justify-between space-x-9">
                                                <div className='flex items-center'>
                                                    <img
                                                        src={completedtask}
                                                        class="w-12 h-10 bg-center bg-cover" alt="Tasks" />
                                                    <div className='p-3'>
                                                        <h3 className="text-lg font-semibold text-black">Total Completed Tasks</h3>
                                                        <p className="text-gray-500 text-md"> Employee</p>
                                                    </div>
                                                </div>
                                                <h4 className=" text-gray-500 font-bold text-xl">{completedTasks.length}</h4>
                                                <Button
                                                    className="w-full text-red-600 bg-red-100 hover:bg-red-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                                                    onClick={() => toggleTaskList('Completed')}
                                                >
                                                    View List
                                                </Button>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </li>

                            {isAdmin && (
                                <li className="text-sm leading-6">
                                    <div className="relative group">
                                        <a href="#" className="cursor-pointer">
                                            <div
                                                className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white hover:bg-gray-100 ring-1 ring-gray-900/5">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={temployees}
                                                        className="w-15 h-12 bg-center bg-cover" alt="Score" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-black">Total Companies:</h3>
                                                        <p className="text-gray-500 text-md">Companies</p>
                                                    </div>
                                                </div>
                                                <h1 className="text-gray-900 font-bold text-8xl text-center">{totalCompanies.length}<span className="text-sm font-bold">-Only</span></h1>
                                                <Button
                                                    className="w-full text-indigo-600 bg-indigo-100 hover:bg-indigo-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                                                    onClick={() => toggleTaskList('Companies')}
                                                >
                                                    View List
                                                </Button>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </section>

            {/* Modal for displaying task lists */}
            <Modal
                open={visibleTaskList !== null}
                onClose={closeModal}
                aria-labelledby="task-list-modal-title"
                aria-describedby="task-list-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        maxHeight: '80vh', // Set maximum height for the modal content
                        overflowY: 'auto', // Enable vertical scrolling
                    }}
                >
                    <Typography id="task-list-modal-title" variant="h6" component="h2">
                        {visibleTaskList === 'total'
                            ? 'Total Tasks'
                            : visibleTaskList === 'Completed'
                                ? 'Completed Tasks'
                                : visibleTaskList === 'Pending'
                                    ? 'Pending Tasks'
                                    : visibleTaskList === 'Cancelled'
                                        ? 'Expired Tasks'
                                        : visibleTaskList === 'In Progress'
                                            ? 'In Progress Tasks'
                                            : visibleTaskList === 'Employees'
                                                ? 'Total Employees'
                                                : visibleTaskList === 'Companies'
                                                    ? 'Total Companies'
                                                    : ''}
                    </Typography>
                    <div id="task-list-modal-description">
                        {visibleTaskList === 'total' && renderTaskTitles(totalTasks, [], [])}
                        {visibleTaskList === 'Completed' && renderTaskTitles(completedTasks, [], [])}
                        {visibleTaskList === 'Pending' && renderTaskTitles(pendingTasks, [], [])}
                        {visibleTaskList === 'Cancelled' && renderTaskTitles(expiredTasks, [], [])}
                        {visibleTaskList === 'In Progress' && renderTaskTitles(InProgressTasks, [], [])}
                        {visibleTaskList === 'Employees' && renderTaskTitles([], totalEmployees, [])}
                        {visibleTaskList === 'Companies' && renderTaskTitles([], [], totalCompanies)}
                    </div>
                    <Button onClick={closeModal} variant="contained" color="primary" sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default AdminPannelGrid
