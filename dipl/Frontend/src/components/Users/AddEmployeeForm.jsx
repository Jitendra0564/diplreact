import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ onBack }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    password: '',
    isAdmin: false,
    fatherName: '',
    motherName: '',
    contactNo: '',
    AlternativeNo: '',
    fatherNo: '',
    Address: '',
    BankName: '',
    BankAccNo: '',
    Ifsc: '',
    Department: '',
    Position: '',
    Role: '',
    AadharCardNo: '',
    PanCardNo: '',
    joiningdate: '',
    Education: [{ degree: '', field_of_study: '', institution: '', start_date: '', end_date: '' }],
    Organization: '',
    workHistory: [{ company: '', job_title: '', start_date: '', end_date: '' }],
    Language: '',
    status: 'Active',
  });
  const [files, setFiles] = useState({
    pancard: null,
    resume: null,
    photo: null,
    idProof: null,
  });

  const [error, setError] = useState('');
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0],
    }));
    console.log('Selected files:', files); // Add this line
  };

  const checkUserExists = async (email) => {
    try {
      const response = await axios.get(`${baseURL}/users?email=${email}`);
      return response.data.exists;
    } catch (error) {
      console.error('Error checking user existence', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const userExists = await checkUserExists(formData.email);
    if (userExists) {
      setError('A user with this email already exists.');
      return;
    }
  
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'Education' || key === 'workHistory') {
        form.append(key, JSON.stringify(formData[key]));
      } else if (key !== 'files') {
        form.append(key, formData[key]);
      }
    });
  
    Object.keys(files).forEach((fileKey) => {
      if (files[fileKey]) {
        form.append(fileKey, files[fileKey]);
      }
    });
    //console.log('FormData files:', form.getAll('pancard'), form.getAll('resume'), form.getAll('photo'), form.getAll('idProof'));

  
    try {
      const response = await axios.post('${baseURL}/users', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status >= 200 && response.status < 300) {
        console.log('User created successfully');
        alert('User created successfully');
        resetForm();
        navigate('/user');
        onBack(); // Call onBack callback
      } else {
        console.error('Error creating user');
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      dob: '',
      password: '',
      isAdmin: false,
      fatherName: '',
      motherName: '',
      contactNo: '',
      AlternativeNo: '',
      fatherNo: '',
      Address: '',
      BankName: '',
      BankAccNo: '',
      Ifsc: '',
      Department: '',
      Position: '',
      Role: '',
      AadharCardNo: '',
      PanCardNo: '',
      joiningdate: '',
      Education: [{ degree: '', field_of_study: '', institution: '', start_date: '', end_date: '' }],
      Organization: '',
      workHistory: [{ company: '', job_title: '', start_date: '', end_date: '' }],
      Language: '',
      status: 'Active',
    });
    setFiles({
      pancard: null,
      resume: null,
      photo: null,
      idProof: null,
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-2 bg-slate-800 rounded-lg shadow-md my-4 p-8 border-2 border-sky-900">
      <h4 className="text-2xl font-bold text-center mb-6 text-white">Add Employee:</h4>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-white">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-white">
            Dob:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Enter D.O.B"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fatherName" className="block text-sm font-medium text-white">
            Father Name:
          </label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            placeholder="Enter Father Name"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="motherName" className="block text-sm font-medium text-white">
            Mother Name:
          </label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            placeholder="Enter Mother Name"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNo" className="block text-sm font-medium text-white">
            Contact No:
          </label>
          <input
            type="text"
            id="contactNo"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            placeholder="Enter contact No"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="AlternativeNo" className="block text-sm font-medium text-white">
            Alternative No:
          </label>
          <input
            type="text"
            id="AlternativeNo"
            name="AlternativeNo"
            value={formData.AlternativeNo}
            onChange={handleChange}
            placeholder="Enter Alternative No"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fatherNo" className="block text-sm font-medium text-white">
            Father No:
          </label>
          <input
            type="text"
            id="fatherNo"
            name="fatherNo"
            value={formData.fatherNo}
            onChange={handleChange}
            placeholder="Enter Father No"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Address" className="block text-sm font-medium text-white">
            Address:
          </label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            placeholder="Enter Address"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="BankName" className="block text-sm font-medium text-white">
            Bank Name:
          </label>
          <input
            type="text"
            id="BankName"
            name="BankName"
            value={formData.BankName}
            onChange={handleChange}
            placeholder="Enter Bank Name"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="BankAccNo" className="block text-sm font-medium text-white">
            Bank Acc No:
          </label>
          <input
            type="text"
            id="BankAccNo"
            name="BankAccNo"
            value={formData.BankAccNo}
            onChange={handleChange}
            placeholder="Enter Bank Acc No"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Ifsc" className="block text-sm font-medium text-white">
            IFSC:
          </label>
          <input
            type="text"
            id="Ifsc"
            name="Ifsc"
            value={formData.Ifsc}
            onChange={handleChange}
            placeholder="Enter IFSC"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Department" className="block text-sm font-medium text-white">
            Department:
          </label>
          <input
            type="text"
            id="Department"
            name="Department"
            value={formData.Department}
            onChange={handleChange}
            placeholder="Enter Department"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Position" className="block text-sm font-medium text-white">
            Position:
          </label>
          <input
            type="text"
            id="Position"
            name="Position"
            value={formData.Position}
            onChange={handleChange}
            placeholder="Enter Position"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Role" className="block text-sm font-medium text-white">
            Role:
          </label>
          <input
            type="text"
            id="Role"
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            placeholder="Enter Role"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="AadharCardNo" className="block text-sm font-medium text-white">
            Aadhar Card No:
          </label>
          <input
            type="text"
            id="AadharCardNo"
            name="AadharCardNo"
            value={formData.AadharCardNo}
            onChange={handleChange}
            placeholder="Enter Aadhar Card No"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="PanCardNo" className="block text-sm font-medium text-white">
            Pan Card No:
          </label>
          <input
            type="text"
            id="PanCardNo"
            name="PanCardNo"
            value={formData.PanCardNo}
            onChange={handleChange}
            placeholder="Enter Pan Card No"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="joiningdate" className="block text-sm font-medium text-white">
            Joining Date:
          </label>
          <input
            type="date"
            id="joiningdate"
            name="joiningdate"
            value={formData.joiningdate}
            onChange={handleChange}
            placeholder="Enter Joining Date"
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          />
        </div>
        {/* Education and workHistory inputs would be similar */}
        <div className="mb-4">
          <label htmlFor="pancard" className="block text-sm font-medium text-white">
            Pancard:
          </label>
          <input
            type="file"
            //id="pancard"
            name="pancard"
            onChange={handleFileChange}
            className="mt-1 block w-full text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block text-sm font-medium text-white">
            Resume:
          </label>
          <input
            type="file"
            //id="resume"
            name="resume"
            onChange={handleFileChange}
            className="mt-1 block w-full text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block text-sm font-medium text-white">
            Photo:
          </label>
          <input
            type="file"
           // id="photo"
            name="photo"
            onChange={handleFileChange}
            className="mt-1 block w-full text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="idProof" className="block text-sm font-medium text-white">
            ID Proof:
          </label>
          <input
            type="file"
            //id="idProof"
            name="idProof"
            onChange={handleFileChange}
            className="mt-1 block w-full text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-white">
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 bg-transparent border border-sky-900 block w-full shadow-none sm:text-sm text-white rounded-md h-10 pl-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Education Section */}
        {formData.Education.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded bg-white">
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const newEducation = formData.Education.slice();
                newEducation[index].degree = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  Education: newEducation,
                }));
              }}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              name="field_of_study"
              placeholder="Field of Study"
              value={edu.field_of_study}
              onChange={(e) => {
                const newEducation = formData.Education.slice();
                newEducation[index].field_of_study = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  Education: newEducation,
                }));
              }}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => {
                const newEducation = formData.Education.slice();
                newEducation[index].institution = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  Education: newEducation,
                }));
              }}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="date"
              name="start_date"
              placeholder="Start Date"
              value={edu.start_date}
              onChange={(e) => {
                const newEducation = formData.Education.slice();
                newEducation[index].start_date = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  Education: newEducation,
                }));
              }}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="date"
              name="end_date"
              placeholder="End Date"
              value={edu.end_date}
              onChange={(e) => {
                const newEducation = formData.Education.slice();
                newEducation[index].end_date = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  Education: newEducation,
                }));
              }}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <button
              type="button"
              onClick={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  Education: formData.Education.filter((_, eduIndex) => eduIndex !== index),
                }));
              }}
              className="px-4 py-2 bg-red-500 text-white rounded mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setFormData((prevData) => ({
              ...prevData,
              Education: [
                ...formData.Education,
                { degree: '', field_of_study: '', institution: '', start_date: '', end_date: '' },
              ],
            }));
          }}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gradient-to-r hover:from-sky-700 hover:to-sky-500"
        >
          Add Education
        </button>

         {/* Work History Section */}
         {formData.workHistory.map((work, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded bg-white">
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={work.company}
              onChange={(e) => {
                const newWorkHistory = formData.workHistory.slice();
                newWorkHistory[index].company = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  workHistory: newWorkHistory,
                }));
              }}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              name="job_title"
              placeholder="Job Title"
              value={work.job_title}
              onChange={(e) => {
                const newWorkHistory = formData.workHistory.slice();
                newWorkHistory[index].job_title = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  workHistory: newWorkHistory,
                }));
              }}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="date"
              name="start_date"
              placeholder="Start Date"
              value={work.start_date}
              onChange={(e) => {
                const newWorkHistory = formData.workHistory.slice();
                newWorkHistory[index].start_date = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  workHistory: newWorkHistory,
                }));
              }}
              className="mb-2 p-2 border-gray-300 rounded w-full"
            />
            <input
              type="date"
              name="end_date"
              placeholder="End Date"
              value={work.end_date}
              onChange={(e) => {
                const newWorkHistory = formData.workHistory.slice();
                newWorkHistory[index].end_date = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  workHistory: newWorkHistory,
                }));
              }}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <button
              type="button"
              onClick={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  workHistory: formData.workHistory.filter((_, workIndex) => workIndex !== index),
                }));
              }}
              className="px-4 py-2 bg-red-500 text-white rounded mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setFormData((prevData) => ({
              ...prevData,
              workHistory: [
                ...formData.workHistory,
                { company: '', job_title: '', start_date: '', end_date: '' },
              ],
            }));
          }}
          className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gradient-to-r hover:from-sky-700 hover:to-sky-500"
        >
          Add Work History
        </button>
        <div className="mb-4">
          <label htmlFor="isAdmin" className="block text-sm font-medium text-white">
            Is Admin:
          </label>
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
            className="mt-1 bg-transparent border border-sky-900 block shadow-none sm:text-sm text-white rounded-md h-5 w-5"
          />
        </div>
        {error && (
          <div className="col-span-full text-red-600">
            {error}
          </div>
        )}
        <div className="col-span-full">
          <button
            type="submit"
            className="bg-sky-900 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gradient-to-r hover:from-sky-700 hover:to-sky-500"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
