import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AssignTaskForm = ({ onBack }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        // Fetch employee data from the backend
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const initialValues = {
        title: '',
        assignedTo: '',
        assignDate: '',
        DueDate: '',
        description: '',
        status: 'Pending' // Default status
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Task name is required'),
        assignedTo: Yup.string().required('Employee name is required'),
        assignDate: Yup.date().required('Start date is required'),
        DueDate: Yup.date().required('End date is required').min(Yup.ref('assignDate'), 'End date must be after start date'),
        description: Yup.string().required('Description is required'),
        //status: Yup.string()
    });

    const onSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/tasks/', values);
            //console.log('Task created successfully:', response.data);
            alert('Task assigned successfully!');
            resetForm();
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
                navigate('/task'); // Navigate back to task table
                onBack(); // Call onBack callback
            }, 3000); // Hide the alert after 3 seconds
        } catch (error) {
            console.error('Error creating task:', error);
            alert('An error occurred while assigning the task.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-slate-800 rounded-lg shadow-md p-8 border-2 border-sky-900">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Task Name */}
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-white">Task Name</label>
                            <Field
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter task name"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                         {/* Employee Name */}
                         <div className="mb-4">
                            <label htmlFor="assignedTo" className="block text-sm font-medium text-white">Employee Name</label>
                            <Field
                                as="select"
                                id="assignedTo"
                                name="assignedTo"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            >
                                <option value="" label="Select employee" className='text-gray-800' />
                                {users.map((users) => (
                                    <option key={users._id} value={users._id} className='text-gray-800'>
                                        {users.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="assignedTo" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Start Date */}
                        <div className="mb-4">
                            <label htmlFor="assignDate" className="block text-sm font-medium text-white">Start Date</label>
                            <Field
                                type="date"
                                id="assignDate"
                                name="assignDate"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="assignDate" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* End Date */}
                        <div className="mb-4">
                            <label htmlFor="dueDate" className="block text-sm font-medium text-white">End Date</label>
                            <Field
                                type="date"
                                id="DueDate"
                                name="DueDate"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="DueDate" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Description */}
                        <div className="mb-4 sm:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                placeholder="Enter task description"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-24 pl-2 resize-none"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Status (Dropdown) */}
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-sm font-medium text-white">Status</label>
                            <Field as="select" id="status" name="status" className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2">
                                <option value="Pending" className='text-gray-800'>Pending</option>
                                <option value="In Progress" className='text-gray-800'>In Progress</option>
                                <option value="Cancelled" className='text-gray-800'>Cancelled</option>
                                <option value="Completed" className='text-gray-800'>Completed</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Submit Button */}
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="float-right px-2 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {showSuccessAlert && (
                <div className="bg-green-500 text-white rounded-md p-2 mt-4">
                    Task assigned successfully!
                </div>
            )}
        </div>
    );
};

export default AssignTaskForm;
