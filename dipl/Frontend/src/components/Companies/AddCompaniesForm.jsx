import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const AddCompaniesForm = ({ onBack }) => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Fetch countries data from an API
        fetch('https://restcountries.com/v2/all')
          .then(response => response.json())
          .then(data => {
            console.log('Fetched countries:', data); // Log the data to check the structure
            // Extract country names from the data
            const countryNames = data.map(country => country.name); // Use country.name for country names
            // Update the countries state with the list of country names
            setCountries(countryNames);
          })
          .catch(error => console.error('Error fetching countries:', error));
      }, []);


    const initialValues = {
        name: '',
        owner: '',
        details: {
            address: {
                street: '',
                city: '',
                state: '',
                zip: '',
                country: ''
            },
            contact: {
                phone: '',
                email: '',
                website: ''
            },
            employees: [
                { name: '', email: '', position: '', phone: '' }
            ],
            departments: [
                { name: '', manager: '', employees: [''] }
            ],
            products: [
                { name: '', category: '', price: '', launch_date: '' }
            ],
            financials: {
                fiscal_year: 0,
                revenue: 0,
                expenses: 0,
                net_income: 0
            }
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Company name is required'),
        owner: Yup.string().required('Owner name is required'),
        details: Yup.object().shape({
            contact: Yup.object().shape({
                phone: Yup.string().required('Phone number is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
                website: Yup.string().url('Invalid website URL').required('Website is required')
            }),
            financials: Yup.object().shape({
                fiscal_year: Yup.number().required('Fiscal year is required').positive().integer(),
                revenue: Yup.number().required('Revenue is required').positive(),
                expenses: Yup.number().required('Expenses is required').positive(),
                net_income: Yup.number().required('Net income is required').positive()
            })
        })
    });

    const onSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/companies', values);
            console.log('Company created successfully:', response.data);
            alert('Company Created successfully!');
            setSubmitting(false);
            resetForm();
            navigate('/company');
            onBack();
        } catch (error) {
            console.error('Error creating Company:', error);
            alert('An error occurred while creating the Company.');
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-slate-800 rounded-lg shadow-md p-8 border-2 border-sky-900">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, isSubmitting }) => (
                    <Form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-white">Company Name</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter company name"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="owner" className="block text-sm font-medium text-white">Owner Name</label>
                            <Field
                                type="text"
                                id="owner"
                                name="owner"
                                placeholder="Enter owner name"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="owner" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.contact.phone" className="block text-sm font-medium text-white">Phone</label>
                            <Field
                                type="text"
                                id="details.contact.phone"
                                name="details.contact.phone"
                                placeholder="Enter phone number"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.contact.phone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.contact.email" className="block text-sm font-medium text-white">Email</label>
                            <Field
                                type="text"
                                id="details.contact.email"
                                name="details.contact.email"
                                placeholder="Enter email address"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.contact.email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.contact.website" className="block text-sm font-medium text-white">Website</label>
                            <Field
                                type="text"
                                id="details.contact.website"
                                name="details.contact.website"
                                placeholder="Enter website"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.contact.website" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.address.street" className="block text-sm font-medium text-white">Street</label>
                            <Field
                                type="text"
                                id="details.address.street"
                                name="details.address.street"
                                placeholder="Enter street"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.address.street" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.address.city" className="block text-sm font-medium text-white">City</label>
                            <Field
                                type="text"
                                id="details.address.city"
                                name="details.address.city"
                                placeholder="Enter city"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.address.city" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.address.state" className="block text-sm font-medium text-white">State</label>
                            <Field
                                type="text"
                                id="details.address.state"
                                name="details.address.state"
                                placeholder="Enter state"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.address.state" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.address.zip" className="block text-sm font-medium text-white">ZIP Code</label>
                            <Field
                                type="text"
                                id="details.address.zip"
                                name="details.address.zip"
                                placeholder="Enter ZIP code"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.address.zip" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.address.country" className="block text-sm font-medium text-white">Country</label>
                            <Field
                                as="select"
                                id="details.address.country"
                                name="details.address.country"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-gray-500 rounded-md h-10 pl-2"
                            >
                                <option value="">Select a country</option>
                                {/* Populate options with dynamically fetched country names */}
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>{country}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="details.address.country" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <FieldArray name="details.employees">
                            {({ push, remove }) => (
                                <>
                                    {values.details.employees.map((employee, index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="block text-sm font-medium text-white">Employee {index + 1}</h3>
                                            <Field
                                                type="text"
                                                name={`details.employees.${index}.name`}
                                                placeholder="Employee Name"
                                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                            />
                                            <Field
                                                type="text"
                                                name={`details.employees.${index}.email`}
                                                placeholder="Employee Email"
                                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                            />
                                            <Field
                                                type="text"
                                                name={`details.employees.${index}.position`}
                                                placeholder="Employee Position"
                                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                            />
                                            <Field
                                                type="text"
                                                name={`details.employees.${index}.phone`}
                                                placeholder="Employee Phone"
                                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                                            >
                                                Remove Employee
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => push({ name: '', email: '', position: '', phone: '' })}
                                        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                                    >
                                        Add Employee
                                    </button>
                                </>
                            )}
                        </FieldArray>

                        <FieldArray name="details.departments">
                            {({ push, remove }) => (
                                <>
                                    {values.details.departments.map((department, index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="block text-sm font-medium text-white">Department {index + 1}</h3>
                                            <Field
                                                type="text"
                                                name={`details.departments.${index}.name`}
                                                placeholder="Department Name"
                                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                            />
                                            <Field
                                                type="text"
                                                name={`details.departments.${index}.manager`}
                                                placeholder="Department Manager"
                                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                            />
                                            <FieldArray name={`details.departments.${index}.employees`}>
                                                {({ push, remove }) => (
                                                    <>
                                                        {department.employees.map((employee, empIndex) => (
                                                            <div key={empIndex} className="mb-2">
                                                                <Field
                                                                    type="text"
                                                                    name={`details.departments.${index}.employees.${empIndex}`}
                                                                    placeholder="Employee"
                                                                    className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => remove(empIndex)}
                                                                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            onClick={() => push('')}
                                                            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                                                        >
                                                            Add Employee
                                                        </button>
                                                    </>
                                                )}
                                            </FieldArray>
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                                            >
                                                Remove Department
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => push({ name: '', manager: '', employees: [''] })}
                                        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                                    >
                                        Add Department
                                    </button>
                                </>
                            )}
                        </FieldArray>

                        <FieldArray name="details.products">
                            {({ push, remove }) => (
                                <>
                                    {values.details.products.map((product, index) => (
                                        <div key={index} className="mb-4">
                                            <h3 className="block text-sm font-medium text-white">Product {index + 1}</h3>
                                            <Field
                                                type="text"
                                                name={`details.products.${index}.name`}
                                                placeholder="Product Name"
                                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                            />
                                            <Field
                                                type="text"
                                                name={`details.products.${index}.category`}
                                                placeholder="Product Category"
                                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                            />
                                            <Field
                                                type="text"
                                                name={`details.products.${index}.price`}
                                                placeholder="Product Price"
                                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                            />
                                            <Field
                                                type="date"
                                                name={`details.products.${index}.launch_date`}
                                                placeholder="Launch Date"
                                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                                            >
                                                Remove Product
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => push({ name: '', category: '', price: '', launch_date: '' })}
                                        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
                                    >
                                        Add Product
                                    </button>
                                </>
                            )}
                        </FieldArray>

                        <div className="mb-4">
                            <label htmlFor="details.financials.fiscal_year" className="block text-sm font-medium text-white">Fiscal Year</label>
                            <Field
                                type="number"
                                id="details.financials.fiscal_year"
                                name="details.financials.fiscal_year"
                                placeholder="Enter fiscal year"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.financials.fiscal_year" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.financials.revenue" className="block text-sm font-medium text-white">Revenue</label>
                            <Field
                                type="number"
                                id="details.financials.revenue"
                                name="details.financials.revenue"
                                placeholder="Enter revenue"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.financials.revenue" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.financials.expenses" className="block text-sm font-medium text-white">Expenses</label>
                            <Field
                                type="number"
                                id="details.financials.expenses"
                                name="details.financials.expenses"
                                placeholder="Enter expenses"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.financials.expenses" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="details.financials.net_income" className="block text-sm font-medium text-white">Net Income</label>
                            <Field
                                type="number"
                                id="details.financials.net_income"
                                name="details.financials.net_income"
                                placeholder="Enter net income"
                                className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
                            />
                            <ErrorMessage name="details.financials.net_income" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="sm:col-span-2 flex justify-between">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                            {/* <button
                                type="button"
                                onClick={resetForm}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Reset
                            </button> */}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddCompaniesForm;