import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const AssignProjectForm = ({ onBack }) => {
    const navigate = useNavigate();

    const initialValues = {
        assignedTo: '',
        projectDescription: '',
        dueDate: '',
        assignedDate: '', // New field for assigned date
    };

    const validationSchema = Yup.object().shape({
        assignedTo: Yup.string().required('Assigned to field is required'),
        projectDescription: Yup.string().required('Project description is required'),
        dueDate: Yup.date().required('Due date is required'),
        assignedDate: Yup.date().required('Assigned date is required'),
    });

    const onSubmit = (values, { resetForm, setSubmitting }) => {
        // Simulate form submission
        setTimeout(() => {
            console.log(values);
            setSubmitting(false);
            alert('Project assigned successfully!');
            navigate('/projects'); // Navigate back to project table
            onBack(); // Call onBack callback
        }, 1000);
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-slate-800 rounded-lg shadow-md p-8 border-2 border-sky-900">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Assigned To */}
                        <div className="mb-4">
                            <label htmlFor="assignedTo" className="block text-sm font-medium text-white">Assigned To</label>
                            <Field
                                type="text"
                                id="assignedTo"
                                name="assignedTo"
                                placeholder="Enter assigned to"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="assignedTo" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Project Description */}
                        <div className="mb-4 sm:col-span-2">
                            <label htmlFor="projectDescription" className="block text-sm font-medium text-white">Project Description</label>
                            <Field
                                as="textarea"
                                id="projectDescription"
                                name="projectDescription"
                                placeholder="Enter project description"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-24 pl-2 resize-none"
                            />
                            <ErrorMessage name="projectDescription" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Due Date */}
                        <div className="mb-4">
                            <label htmlFor="dueDate" className="block text-sm font-medium text-white">Due Date</label>
                            <Field
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Assigned Date */}
                        <div className="mb-4">
                            <label htmlFor="assignedDate" className="block text-sm font-medium text-white">Assigned Date</label>
                            <Field
                                type="date"
                                id="assignedDate"
                                name="assignedDate"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="assignedDate" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Submit Button */}
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="float-right px-2 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                            >
                                {isSubmitting ? 'Assigning...' : 'Assign Project'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AssignProjectForm;
