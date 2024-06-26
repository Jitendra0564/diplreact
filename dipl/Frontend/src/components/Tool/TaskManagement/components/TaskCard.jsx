import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Modal, Box, Button } from '@mui/material';

const TaskCard = () => {
    const [totalTasks, setTotalTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [expiredTasks, setExpiredTasks] = useState([]);
    const [InProgressTasks, setInProgress] = useState([]);
    const [visibleTaskList, setVisibleTaskList] = useState(null); // Track the currently visible task list

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
                const response = await axios.get('http://localhost:5000/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const allTasks = response.data;
                setTotalTasks(allTasks);
                setCompletedTasks(allTasks.filter((task) => task.status === 'Completed'));
                setPendingTasks(allTasks.filter((task) => task.status === 'Pending'));
                setExpiredTasks(allTasks.filter((task) => task.status === 'Cancelled'));
                setInProgress(allTasks.filter((task) => task.status === 'In Progress'));
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, [isAdmin, token]);

    const renderTaskTitles = (tasks) => {
        return tasks.map((task, index) => (
            <div key={task._id} className="mb-2">
                <Typography variant="body1">{`${index + 1}.${task.title}`}</Typography>
                <Typography variant="body1"style={{ fontWeight: 'bold', color: 'black' }}>{task.description}</Typography>
            </div>
        ));
    };

    const toggleTaskList = (listType) => {
        setVisibleTaskList(listType);
    };

    const closeModal = () => {
        setVisibleTaskList(null);
    };

    return (
        <>
            <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4 auto-rows-auto">
                    {/* Card 1 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-purple-200 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-purple-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 20h5v-2a2 2 0 00-2-2h-3v4z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15v4a2 2 0 002 2h3v-4"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15h16"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="text-gray-600 text-sm"data-testid="total-tasks-title">
                                    {isAdmin ? 'Total Tasks' : 'Tasks Assigned to You'}
                                </div>
                                <div className="text-gray-900 text-2xl font-semibold" data-testid="total">
                                    {totalTasks.length}
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full text-purple-600 bg-purple-100 hover:bg-purple-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            onClick={() => toggleTaskList('total')}
                            data-testid="view-list-button"
                        >
                            View List
                        </Button>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-green-200 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 20h5v-2a2 2 0 00-2-2h-3v4z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15v4a2 2 0 002 2h3v-4"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15h16"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="text-gray-600 text-sm"data-testid="total-Completed-title">Total Completed Tasks</div>
                                <div className="text-2xl font-semibold text-green-500"data-testid="completed">
                                    {completedTasks.length}
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full text-green-600 bg-green-100 hover:bg-green-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            onClick={() => toggleTaskList('Completed')}
                            data-testid="view-Completed-button"
                        >
                            View List
                        </Button>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-yellow-200 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-yellow-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 20h5v-2a2 2 0 00-2-2h-3v4z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15v4a2 2 0 002 2h3v-4"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15h16"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="text-gray-600 text-sm"data-testid="total-Pending-title">Total Pending Tasks</div>
                                <div className="text-yellow-900 text-2xl font-semibold"data-testid="pending">
                                    {pendingTasks.length}
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full text-yellow-600 bg-yellow-100 hover:bg-yellow-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            onClick={() => toggleTaskList('Pending')}
                            data-testid="view-Pending-button"
                        >
                            View List
                        </Button>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-red-200 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-red-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 20h5v-2a2 2 0 00-2-2h-3v4z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15v4a2 2 0 002 2h3v-4"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15h16"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="text-gray-600 text-sm"data-testid="total-Expired-title">Total Expired Tasks</div>
                                <div className="text-red-700 text-2xl font-semibold"data-testid="expired">
                                    {expiredTasks.length}
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full text-red-600 bg-red-100 hover:bg-red-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            onClick={() => toggleTaskList('Cancelled')}
                            data-testid="view-Expired-button"
                        >
                            View List
                        </Button>
                    </div>
                    {/* Card 5 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-green-200 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 20h5v-2a2 2 0 00-2-2h-3v4z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15V7a2 2 0 012-2h10a2 2 0 012 2v8"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15v4a2 2 0 002 2h3v-4"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 15h16"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="text-gray-600 text-sm"data-testid="total-InProgress-title">Total In Progress Tasks</div>
                                <div className="text-2xl  text-green-700 font-semibold"data-testid="inprogress">
                                    {InProgressTasks.length}
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full text-red-600 bg-red-100 hover:bg-red-200 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                            onClick={() => toggleTaskList('In Progress')}
                             data-testid="view-In Progress-button"
                        >
                            View List
                        </Button>
                    </div>
                </div>
            </div>

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
                        maxHeight: '50vh', // Set maximum height for the modal content
                        overflowY: 'auto', // Enable vertical scrolling
                    }}
                >
                    <Typography id="task-list-modal-title" variant="h6" component="h2" data-testid="modal-heading">
                        {visibleTaskList === 'total' && 'Total Tasks'}
                        {visibleTaskList === 'Completed' && 'Completed Tasks'}
                        {visibleTaskList === 'Pending' && 'Pending Tasks'}
                        {visibleTaskList === 'Cancelled' && 'Expired Tasks'}
                        {visibleTaskList === 'In Progress' && 'In Progress Tasks'}
                    </Typography>
                    <div id="task-list-modal-description">
                        {visibleTaskList === 'total' && renderTaskTitles(totalTasks)}
                        {visibleTaskList === 'Completed' && renderTaskTitles(completedTasks)}
                        {visibleTaskList === 'Pending' && renderTaskTitles(pendingTasks)}
                        {visibleTaskList === 'Cancelled' && renderTaskTitles(expiredTasks)}
                        {visibleTaskList === 'In Progress' && renderTaskTitles(InProgressTasks)}
                    </div>
                    <Button onClick={closeModal} variant="contained" color="primary" sx={{ mt: 2 }} data-testid="close-button">
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default TaskCard;

