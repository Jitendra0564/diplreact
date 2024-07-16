import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import {
    MdOutlineAddTask,
    MdMoreVert,
    MdClose,
    MdNotifications,
  } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import {
    Badge,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Popover,
    MenuItem,
    Typography,
    TextField,
    Snackbar,
    IconButton,
    Box,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import AssignEmployee from './AddEmployeeForm';
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
    const [isEmployeeFormOpen, setEmployeeFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

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
                        <motion.button
                            onClick={() => navigate(`/UserProfile/${userId}`)} // Navigate to /UserProfile/{userId}
                            className="bg-blue-100 py-1 px-3 rounded-md font-regular"
                            whileHover={{ scale: 1.05 }} // Scale up by 5% on hover
                            whileTap={{ scale: 0.95 }} // Scale down by 5% on tap
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                            View Profile
                        </motion.button>
                    );
                }
            }
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token'); 

        try {
            const response = await axios.get(`${baseURL}/users/users`, {
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

    const handleOpenTaskForm = () => {
        setEmployeeFormOpen(true);
      };
    
      const handleCloseTaskForm = () => {
        setEmployeeFormOpen(false);
      };
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const options = {
        selectableRows: 'none',
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30],
        responsive: "standard",
        customToolbar: () => (
            <Box
              display="center"
              justifyContent={isSmallScreen ? "center" : "space-around"}
              alignItems="center"
              padding={isSmallScreen ? "8px" : "16px"}
              flexDirection={isSmallScreen ? "column" : "row"}
            >
               <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                style={{ marginBottom: isSmallScreen ? "8px" : "0" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<MdOutlineAddTask />}
                  onClick={handleOpenTaskForm}
                >
                  Add Employee
                </Button>
              </motion.div>
            </Box>
          ),
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
          {/* Employee Creation Form Dialog */}
          <Dialog open={isEmployeeFormOpen} onClose={handleCloseTaskForm}>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContent>
              <AssignEmployee onBack={handleCloseTaskForm} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseTaskForm} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
};

export default UserTable;
