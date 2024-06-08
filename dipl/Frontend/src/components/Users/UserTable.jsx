import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const getMuiTheme = () =>
    createTheme({
        typography: {},
        palette: {
            background: {
                paper: "#fff",
            },
            mode: "light",
        },
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        fontWeight: 600,
                    },
                    head: {
                        padding: "14px 4px",
                    },
                    body: {
                        padding: "12px 15px",
                        color: "#000",
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                    },
                },
            },
        },
    });

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const columns = [
        { name: "id", label: "S.No:" },
        { name: "name", label: "Name" },
        { name: 'email', label: "Email" },
        { 
            name: 'actions',
            label: 'Actions',
            options: {
                customBodyRender: (value, tableMeta) => {
                    const rowId = tableMeta.rowIndex; // Assuming each row's index corresponds to _id
                    const userId = users[rowId]._id;

                    return (
                        <button
                            onClick={() => navigate(`/UserProfile/${userId}`)} // Navigate to /UserProfile/{userId}
                            className="bg-rose-400 py-1 px-3 rounded-md font-regular"
                        >
                            View Profile
                        </button>
                    );
                }
            }
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token'); // or however you store the token

        try {
            const response = await axios.get('http://localhost:5000/api/users/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Add serial number to each user object
            const usersWithSerialNumber = response.data.map((user, index) => ({
                ...user,
                id: index + 1 // Serial number starting from 1
            }));
            setUsers(usersWithSerialNumber);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const options = {
        selectableRows: 'none',
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30],
    };

    return (
        <div className="">
            <div className="mx-6 my-6 mt-6 mb-6">
                <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={"Users List"}
                        data={users}
                        columns={columns}
                        options={options}
                    />
                </ThemeProvider>
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default UserTable;
