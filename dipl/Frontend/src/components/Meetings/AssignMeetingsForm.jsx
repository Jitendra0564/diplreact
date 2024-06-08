import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const AssignMeetingsForm = ({ onBack }) => {
    const navigate = useNavigate();

    const initialValues = {
        meetingName: '',
        meetingDescription: '',
        meetingWith: 'individual', // Default meeting with individual
        meetingDate: '',
        meetingTime: '',
        hostedBy: '',
        selectedUsers: [] // For team meetings, selected users array
    };

    const validationSchema = Yup.object().shape({
        meetingName: Yup.string().required('Meeting name is required'),
        meetingDescription: Yup.string().required('Meeting description is required'),
        meetingWith: Yup.string().required('Meeting type is required'),
        meetingDate: Yup.date().required('Meeting date is required'),
        meetingTime: Yup.string().required('Meeting time is required'),
        hostedBy: Yup.string().required('Hosted by is required'),
        selectedUsers: Yup.array().when('meetingWith', {
            is: 'team',
            then: Yup.array().min(1, 'Select at least one team member')
        })
    });

    const userList = ['User A', 'User B', 'User C', 'User D', 'User E'];

    const onSubmit = (values, { setSubmitting }) => {
        // Simulate form submission
        setTimeout(() => {
            console.log(values);
            setSubmitting(false);
            alert('Meeting assigned successfully!');
            navigate('/meetings'); // Navigate back to meetings table
            onBack(); // Call onBack callback
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-slate-800 rounded-lg shadow-md p-8 border-2 border-sky-900">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, isSubmitting, setFieldValue }) => (
                    <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Meeting Type */}
                        <div className="mb-4">
                            <label htmlFor="meetingWith" className="block text-sm font-medium text-white">Meeting Type</label>
                            <Field as="select" id="meetingWith" name="meetingWith" className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2">
                                <option value="individual" className='text-black'>Individual</option>
                                <option value="team" className='text-black'>Team</option>
                            </Field>
                            <ErrorMessage name="meetingWith" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        {values.meetingWith === 'individual' && (
                            <div className="mb-4 sm:col-span-2 scrollable-container">
                                <label className="block text-sm font-medium text-white">Select User</label>
                                <FormControl component="fieldset" className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md p-2">
                                    <FormGroup>
                                        {userList.map((user) => (
                                            <FormControlLabel
                                                key={user}
                                                control={
                                                    <Checkbox
                                                        id={user}
                                                        name="selectedUsers"
                                                        value={user}
                                                        checked={values.selectedUsers.includes(user)}
                                                        onChange={(e) => {
                                                            const selectedUser = e.target.value;
                                                            const isChecked = e.target.checked;
                                                            if (isChecked) {
                                                                // Ensure only one user can be selected
                                                                setFieldValue('selectedUsers', [selectedUser]);
                                                            } else {
                                                                setFieldValue('selectedUsers', []);
                                                            }
                                                        }}
                                                        disabled={values.selectedUsers.length > 0 && !values.selectedUsers.includes(user)}
                                                    />
                                                }
                                                label={user}
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl>
                                <ErrorMessage name="selectedUsers" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        )}

                        {/* Team Members (for Team Meetings) */}
                        {values.meetingWith === 'team' && (
                            <div className="mb-4 sm:col-span-2 scrollable-container">
                                <label className="block text-sm font-medium text-white">Select Team Members</label>
                                <FormControl component="fieldset" className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md p-2">
                                    <FormGroup>
                                        {userList.map((user) => (
                                            <FormControlLabel
                                                key={user}
                                                control={
                                                    <Checkbox
                                                        id={user}
                                                        name="selectedUsers"
                                                        value={user}
                                                        checked={values.selectedUsers.includes(user)}
                                                        onChange={(e) => {
                                                            const selectedUser = e.target.value;
                                                            const isChecked = e.target.checked;
                                                            if (isChecked) {
                                                                setFieldValue('selectedUsers', [...values.selectedUsers, selectedUser]);
                                                            } else {
                                                                const filteredUsers = values.selectedUsers.filter((member) => member !== selectedUser);
                                                                setFieldValue('selectedUsers', filteredUsers);
                                                            }
                                                        }}
                                                    />
                                                }
                                                label={user}
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl>
                                <ErrorMessage name="selectedUsers" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        )}


                        {/* Other Form Fields */}
                        <div className="mb-4">
                            <label htmlFor="meetingDate" className="block text-sm font-medium text-white">Meeting Date</label>
                            <Field
                                type="date"
                                id="meetingDate"
                                name="meetingDate"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="meetingDate" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Meeting Time */}
                        <div className="mb-4">
                            <label htmlFor="meetingTime" className="block text-sm font-medium text-white">Meeting Time</label>
                            <Field
                                type="time"
                                id="meetingTime"
                                name="meetingTime"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="meetingTime" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="meetingName" className="block text-sm font-medium text-white">Meeting Name</label>
                            <Field
                                type="text"
                                id="meetingName"
                                name="meetingName"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="meetingName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Hosted By */}
                        <div className="mb-4">
                            <label htmlFor="hostedBy" className="block text-sm font-medium text-white">Hosted By</label>
                            <Field
                                type="text"
                                id="hostedBy"
                                name="hostedBy"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="hostedBy" component="div" className="text-red-500 text-sm mt-1" />
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
        </div>
    );
};

export default AssignMeetingsForm;
