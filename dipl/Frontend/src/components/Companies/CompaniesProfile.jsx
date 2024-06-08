import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GiTreeBranch } from "react-icons/gi";
import { PiTagLight } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { RiShieldUserLine } from "react-icons/ri";
import { FcDepartment } from "react-icons/fc";
import { IoBusinessOutline } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";
import { CiBank } from "react-icons/ci";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CiBarcode } from "react-icons/ci";
import { GiLightningBranches } from "react-icons/gi";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BsPersonVideo } from "react-icons/bs";
import { IoBusiness } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const CompaniesProfile = () => {
    const { CompanyId } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDepartments, setShowDepartments] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showFinancial, setShowFinancial] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const toggleDepartments = () => {
        setShowDepartments(!showDepartments);
    };
    const toggleContacts = () => {
        setShowContacts(!showContacts);
    }
    const toggleAddress = () => {
        setShowAddress(!showAddress);
    }
    const toggleProducts = () => {
        setShowProducts(!showProducts);
    }
    const toggleFinancial = () => {
        setShowFinancial(!showFinancial);

    }


    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department === selectedDepartment ? null : department);
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [CompanyId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/companies/${CompanyId}`);
            console.log('Response data:', response.data);
            setCompany(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!company) {
        return <div>No company profile available</div>;
    }
    return (

        <div className='grid grid-cols-1 sm:grid-cols-2 bg-gray-50 border border-gray-300 rounded-lg shadow-xl mx-4 my-4 p-4'>
            <div>
                {/* Company Name */}
                <div className='px-4 py-2'>
                    <div className='flex items-center text-gray-500 font-semibold'>
                        <IoBusiness />
                        <div>
                            <h4 className='px-1'>Company's Name</h4>
                        </div>
                    </div>
                    <p className='text-gray-900 text-sm font-semibold'>{company.name}</p>
                </div>

                {/* Company ID */}
                <div className='px-4 py-2'>
                    <div className='flex items-center text-gray-500 font-semibold'>
                        <BsPersonVideo />
                        <div>
                            <h4 className='px-1'>Company's ID</h4>
                        </div>
                    </div>
                    <p className='text-gray-900 text-sm font-semibold'>{company._id}</p>
                </div>

                {/* Company Remark */}
                <div className='px-4 py-2'>
                    <div className='flex items-center text-gray-500 font-semibold'>
                    <PiTagLight />
                        <div>
                            <h4 className='text-gray-500 font-semibold px-1'>Company's Remark</h4>
                        </div>
                    </div>
                    <p className='text-gray-900 text-sm font-semibold pt-1'>Your Profit Our Progress</p>
                </div>

                {/* Company Owner */}
                <div className='px-4 py-2'>

                    <div className='flex items-center text-gray-500 font-semibold '>
                        <RiShieldUserLine />
                        <div>
                            <h4 className='text-gray-500 font-semibold px-1'>companie's Owner</h4>
                        </div>
                    </div>

                    <p className='text-gray-900 text-sm font-semibold pt-1'>{company.owner}</p>
                </div>
            </div>
            <div>
                <div className='px-4 py-2'>
                    <h4 className='text-gray-900 font-semibold'>General Details :</h4>
                    <div className='flex items-center text-gray-500 font-semibold px-3 pt-4' onClick={toggleAddress}>
                        <IoLocationSharp />
                        <div>
                            <h4 className='text-gray-500 font-semibold px-1'>Company's Address</h4>
                        </div>
                        {showAddress ? (
                            <FiChevronUp className='w-5 h-5 text-gray-500' />
                        ) : (
                            <FiChevronDown className='w-5 h-5 text-gray-500' />
                        )}
                    </div>
                    {showAddress && (
                        <div>
                            {company.details && company.details.address ? (
                                <div className='pt-2 text-gray-900 text-sm'>
                                    <p>Street: {company.details.address.street}</p>
                                    <p>City: {company.details.address.city}</p>
                                    <p>State: {company.details.address.state}</p>
                                    <p>ZIP: {company.details.address.zip}</p>
                                    <p>Country: {company.details.address.country}</p>
                                </div>
                            ) : (
                                <p className='text-gray-900 text-sm font-semibold pt-1'>No Company's Address available</p>
                            )}
                        </div>
                    )}

                    {/* Contact Information */}
                    <div className='px-4 py-2'>
                        <div className='flex items-center text-gray-500 font-semibold' onClick={toggleContacts}>
                            <BsTelephoneFill />
                            <div>
                                <h4 className='text-gray-500 font-semibold px-1'>Company's Contact Info:</h4>
                            </div>
                            {showContacts ? (
                                <FiChevronUp className='w-5 h-5 text-gray-500' />
                            ) : (
                                <FiChevronDown className='w-5 h-5 text-gray-500' />
                            )}
                        </div>
                        {showContacts && (
                            <div className='pt-2 text-gray-900 text-sm'>
                                <p>Phone: {company.details.contact?.phone}</p>
                                <p>Email: {company.details.contact?.email}</p>
                                <p>Website: {company.details.contact?.website}</p>
                            </div>
                        )}
                    </div>


                    {/* Departments */}
                    <div className='px-4 py-2'>
                        <div className='flex items-center text-gray-500 font-semibold cursor-pointer' onClick={toggleDepartments}>
                        <FcDepartment />
                            <div>
                                <h4 className='text-gray-500 font-semibold px-1'>Company's Departments</h4>
                            </div>
                            {showDepartments ? (
                                <FiChevronUp className='w-5 h-5 text-gray-500' />
                            ) : (
                                <FiChevronDown className='w-5 h-5 text-gray-500' />
                            )}
                        </div>
                        {showDepartments && (
                            <ul className='mt-2 border border-gray-200 rounded-md shadow-lg'>
                                {company.details.departments?.map((department) => (
                                    <li
                                        key={department.id}
                                        className='px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer'
                                        onClick={() => handleDepartmentClick(department)}
                                    >
                                        {department.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {selectedDepartment && (
                            <div key={selectedDepartment.id} className='pt-2 text-gray-900 text-sm'>
                                <p>ID: {selectedDepartment.id}</p>
                                <p>Name: {selectedDepartment.name}</p>
                                <p>Manager: {selectedDepartment.manager}</p>
                                <p>Employees: {selectedDepartment.employees?.join(', ')}</p>
                            </div>
                        )}
                    </div>

                    {/* Products */}
                    <div className='px-4 py-2'>
                        <div className='flex items-center cursor-pointer' onClick={toggleProducts}>
                        <MdOutlineProductionQuantityLimits />
                            <h4 className='text-gray-500 font-semibold px-1'>Company's Products</h4>
                            {showProducts ? (
                                <FiChevronUp className='w-5 h-5 text-gray-500' />
                            ) : (
                                <FiChevronDown className='w-5 h-5 text-gray-500' />
                            )}
                        </div>
                        {showProducts && (
                            <div>
                                {company.details.products?.map((product) => (
                                    <div key={product.id} className='pt-2 text-gray-900 text-sm'>
                                        <p>ID: {product.id}</p>
                                        <p>Name: {product.name}</p>
                                        <p>Category: {product.category}</p>
                                        <p>Price: ${product.price?.toFixed(2)}</p>
                                        <p>Launch Date: {new Date(product.launch_date).toDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Financials */}
                    <div className='px-4 py-2'>
                        <div className='flex items-center cursor-pointer' onClick={toggleFinancial}>
                          <MdOutlineAccountBalanceWallet/>
                            <h4 className='text-gray-500 font-semibold px-1'>Company's Financials</h4>
                            {showFinancial ? (
                                <FiChevronUp className='w-5 h-5 text-gray-500' />
                            ) : (
                                <FiChevronDown className='w-5 h-5 text-gray-500' />
                            )}
                        </div>
                        {showFinancial && (
                            <div className='pt-2 text-gray-900 text-sm'>
                                <p>Fiscal Year: {company.details.financials?.fiscal_year}</p>
                                <p>Revenue: ${company.details.financials?.revenue?.toLocaleString()}</p>
                                <p>Expenses: ${company.details.financials?.expenses?.toLocaleString()}</p>
                                <p>Net Income: ${company.details.financials?.net_income?.toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            
        </div>

    )
}

export default CompaniesProfile;
