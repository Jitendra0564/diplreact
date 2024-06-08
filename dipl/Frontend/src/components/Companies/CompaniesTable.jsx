import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { MdOutlineAddTask, MdMoreVert } from 'react-icons/md';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddCompaniesForm from '../../components/Companies/AddCompaniesForm'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const CompaniesTable = () => {
    const [isCompaniesFormOpen, setCompaniesFormOpen] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); // Add state for error
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                setIsLoading(true);
                setError(null); // Clear any previous error
                const response = await axios.get('http://localhost:5000/api/companies');
                
                // Add serial number to each company object
                const companiesWithSerialNumber = response.data.map((company, index) => ({
                    ...company,
                    id: index + 1 // Serial number starting from 1
                }));
    
                // Map through the companies and fetch logo for each
                const companiesWithLogo = await Promise.all(companiesWithSerialNumber.map(async (company) => {
                    // Check if the logoUrl is provided and not empty
                    if (company.logoUrl && company.logoUrl.trim() !== '') {
                        try {
                            const logoResponse = await axios.get(company.logoUrl, { responseType: 'blob' });
                            const logoBlob = logoResponse.data;
                            const logoUrl = URL.createObjectURL(logoBlob);
                            return {
                                ...company,
                                logo: logoUrl // Add logo field with URL of the logo image
                            };
                        } catch (error) {
                            console.error('Error fetching logo for company:', company.name, error);
                            // Handle the error gracefully
                            return {
                                ...company,
                                logo: null // Set logo as null in case of error
                            };
                        }
                    } else {
                        // If logoUrl is not provided or empty, set logo as null
                        return {
                            ...company,
                            logo: null
                        };
                    }
                }));
    
                setCompanies(companiesWithLogo);
            } catch (error) {
                console.error('Error fetching companies:', error);
                setError(error.message); // Set the error message
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchCompanies();
    }, []);
    
    
    const columns = [
        {
            name: "id",
            label: "S.NO:",
            options: {
                sort: true,
                customBodyRender: (value) => (
                    <p className='font-semibold'>{value}</p>
                )
            },
        },
        {
            name: "image",
            label: "COMPANY LOGO",
            options: {
                sort: true,
                customBodyRender: (value) => (
                    <img src={value} alt="Company Logo" style={{ width: 70, height: 70 }} />
                )
            }
        },
        {
            name: "name",
            label: "COMPANY NAME",
            options: {
                sort: true,
                customBodyRender: (value) => (
                    <p className='font-semibold'>{value}</p>
                )
            }
        },
        {
            name: "owner",
            label: "DIRECTOR",
            options: {
                sort: true,
                customBodyRender: (value) => (
                    <p className='font-semibold'>{value}</p>
                )
            }
        },
        {
            name: "Details",
            label: "DETAILS",
            options: {
                sort: true,
                customBodyRender: (value, tableMeta) => {
                    const rowId = tableMeta.rowIndex; // Assuming each row's index corresponds to _id
                    const companyId = companies[rowId]._id;
        
                    return (
                        <button
                            onClick={() => navigate(`/companyprofile/${companyId}`)}
                            className="bg-rose-400 py-1 px-3 rounded-md font-regular"
                        >
                            View Profile
                        </button>
                    );
                }
            }
        }
    ];

    const handleOpenCompaniesForm = () => {
        setCompaniesFormOpen(true);
    };

    const handleCloseCompaniesForm = () => {
        setCompaniesFormOpen(false);
    };

    const options = {
        selectableRows: false,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30],
        pagination: true,
        search: true,
        filter: true,
        print: true,
        download: true,
        viewColumns: true,
        elevation: 0,
        customToolbar: () => (
            <Button
                onClick={handleOpenCompaniesForm}
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-gray-700 hover:text-blue-400 focus:outline-none transition duration-300 ease-in-out"
            >
                <MdOutlineAddTask className="text-xl" />
            </Button>
        ),
    };

    const getMuiTheme = () =>
        createTheme({
            palette: {
                background: {
                    paper: "#fff",
                },
                mode: "light"
            },
            typography: {
                fontFamily: [
                    'Inter',
                    'sans-serif'
                ].join(','),
            },
            components: {
                MUIDataTable: {
                    styleOverrides: {
                        root: {
                            fontWeight: 600,
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                        },
                        head: {
                            padding: "14px 4px",
                            margin: "10px 0",
                        },
                        body: {
                            padding: "12px 15px",
                            color: "#000",
                            margin: "10px 0",
                        },
                    }
                },
            },
        });

    return (
        <div className="">
            <div className="mt-5 mb-5 mr-5 ml-5">
                <ThemeProvider theme={getMuiTheme()}>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <MUIDataTable
                            title=""
                            data={companies}
                            columns={columns}
                            options={options}
                        />
                    )}
                </ThemeProvider>
            </div>
            <Dialog open={isCompaniesFormOpen} onClose={handleCloseCompaniesForm}>
                <DialogTitle>Add Company</DialogTitle>
                <DialogContent>
                    <AddCompaniesForm onBack={handleCloseCompaniesForm} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCompaniesForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CompaniesTable;