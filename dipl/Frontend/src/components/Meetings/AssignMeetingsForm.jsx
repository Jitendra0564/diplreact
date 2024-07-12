import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AssignMeetingsForm = ({ onBack }) => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${baseURL}/users`);
            const data = response.data;
            setUserList(data.map(user => ({ id: user._id, name: user.name })));
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    const initialValues = {
        meetingName: '',
        meetingDescription: '',
        meetingWith: 'individual', // Default meeting with individual
        meetingDate: '',
        meetingTime: '',
        selectedUsers: [] // For team meetings, selected users array
    };

    const validationSchema = Yup.object().shape({
        meetingName: Yup.string().required('Meeting name is required'),
        meetingDescription: Yup.string().required('Meeting description is required'),
        meetingWith: Yup.string().required('Meeting type is required'),
        meetingDate: Yup.date().required('Meeting date is required'),
        meetingTime: Yup.string().required('Meeting time is required'),
        selectedUsers: Yup.array().when('meetingWith', {
            is: 'team',
            then:()=> Yup.array().min(1, 'Select at least one team member'),
            otherwise:()=> Yup.array().max(1, 'Select only one user')
        })
    });

    const onSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            const response = await axios.post(`${baseURL}/meetings`, values);
            alert('Meeting assigned successfully!');
            resetForm();
            setShowSuccessAlert(true);
            setTimeout(() => {
                setSubmitting(false);
                navigate('/meeting'); // Navigate back to meetings table
                onBack(); // Call onBack callback
            }, 1000);
        } catch (error) {
            console.error('Error assigning meeting:', error);
            alert('An error occurred while assigning the Meeting.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-slate-800 rounded-lg shadow-md p-8 border-2 border-sky-900">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, isSubmitting, setFieldValue }) => (
                    <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label htmlFor="meetingWith" className="block text-sm font-medium text-white">Meeting Type</label>
                            <Field as="select" id="meetingWith" name="meetingWith" className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2">
                                <option value="individual" className='text-black'>Individual</option>
                                <option value="team" className='text-black'>Team</option>
                            </Field>
                            <ErrorMessage name="meetingWith" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="mb-4 sm:col-span-2 scrollable-container">
                            <label className="block text-sm font-medium text-white">{values.meetingWith === 'individual' ? 'Select User' : 'Select Team Members'}</label>
                            <FormControl component="fieldset" className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md p-2">
                                <FormGroup>
                                    {userList.map((user) => (
                                        <FormControlLabel
                                        key={user.id}
                                        control={
                                            <Checkbox
                                                id={user.id}
                                                name="selectedUsers"
                                                value={user.id}
                                                checked={values.selectedUsers.includes(user.id)}
                                                onChange={(e) => {
                                                    const selectedUser = e.target.value;
                                                    const isChecked = e.target.checked;
                                                    if (values.meetingWith === 'individual') {
                                                        setFieldValue('selectedUsers', isChecked ? [selectedUser] : []);
                                                    } else {
                                                        if (isChecked) {
                                                            setFieldValue('selectedUsers', [...values.selectedUsers, selectedUser]);
                                                        } else {
                                                            setFieldValue('selectedUsers', values.selectedUsers.filter((u) => u !== selectedUser));
                                                        }
                                                    }
                                                }}
                                                disabled={values.meetingWith === 'individual' && values.selectedUsers.length > 0 && !values.selectedUsers.includes(user.id)}
                                            />
                                        }
                                        label={user.name}
                                    />
                                    ))}
                                </FormGroup>
                            </FormControl>
                            <ErrorMessage name="selectedUsers" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="meetingDate" className="block text-sm font-medium text-white">Meeting Date</label>
                            <Field type="date" id="meetingDate" name="meetingDate" className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2" />
                            <ErrorMessage name="meetingDate" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="meetingTime" className="block text-sm font-medium text-white">Meeting Time</label>
                            <Field type="time" id="meetingTime" name="meetingTime" className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2" />
                            <ErrorMessage name="meetingTime" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="meetingName" className="block text-sm font-medium text-white">Meeting Name</label>
                            <Field type="text" id="meetingName" name="meetingName" className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2" />
                            <ErrorMessage name="meetingName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="meetingDescription" className="block text-sm font-medium text-white">Purpose</label>
                            <Field type="text" id="meetingDescription" name="meetingDescription" className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2" />
                            <ErrorMessage name="meetingDescription" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="sm:col-span-2">
                            <button type="submit" disabled={isSubmitting} className="float-right px-2 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {showSuccessAlert && (
                <div className="bg-green-500 text-white rounded-md p-2 mt-4">
                    Meeting assigned successfully!
                </div>
            )}
        </div>
    );
};

export default AssignMeetingsForm;
