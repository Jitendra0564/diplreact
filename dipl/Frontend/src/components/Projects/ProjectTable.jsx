import React, { useState, useEffect } from 'react';
import { MdOutlineAddTask, MdMoreVert } from 'react-icons/md';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Popover, MenuItem, Typography, TextField, Snackbar } from '@mui/material';
import AssignProjectForm from '../../components/Projects/AssignProjectForm'; // Import the project creation form component

const ProjectTable = () => {
    const [projects, setProjects] = useState([]);
    const [isProjectFormOpen, setProjectFormOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [openProjectDetailsDialog, setOpenProjectDetailsDialog] = useState(false); // State for project details dialog
    const [openProjectUpdateDialog, setOpenProjectUpdateDialog] = useState(false); // State for project update dialog
    const [updatedProject, setUpdatedProject] = useState({
        assignedDate: '',
        dueDate: '',
        projectDescription: ''
    }); // State for updated project details
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State for delete confirmation dialog
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for showing deletion message
    const [newScheduledDate, setNewScheduledDate] = useState(''); // State for new scheduled date

    useEffect(() => {
        // Mock project data
        const mockProjects = generateMockProjects(10);
        setProjects(mockProjects);
    }, []);

    const generateMockProjects = (count) => {
        let mockProjects = [];
        for (let i = 1; i <= count; i++) {
            mockProjects.push({
                id: i,
                projectDescription: `Project ${i}`,
                assignedBy: `User ${getRandomNumber(1, 10)}`,
                assignedTo: `User ${getRandomNumber(1, 10)}`,
                assignedDate: getRandomDate(),
                dueDate: getRandomDate(),
                status: getRandomStatus(),
                progress: getRandomProgress(),
                details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac turpis eu elit efficitur sodales.`,
            });
        }
        return mockProjects;
    };

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomDate = () => {
        const start = new Date(2022, 0, 1);
        const end = new Date();
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate.toISOString().split('T')[0];
    };

    const getRandomStatus = () => {
        const statuses = ['Pending', 'In Progress', 'Completed', 'Expired'];
        const randomIndex = Math.floor(Math.random() * statuses.length);
        return statuses[randomIndex];
    };

    const getRandomProgress = () => {
        return Math.floor(Math.random() * 100); // Generate a random progress value (0-100%)
    };

    const handleOpenProjectForm = () => {
        setProjectFormOpen(true);
    };

    const handleCloseProjectForm = () => {
        setProjectFormOpen(false);
    };

    const handleMenuOpen = (event, project) => {
        setAnchorEl(event.currentTarget);
        setSelectedProject(project);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleViewProjectDetails = () => {
        setAnchorEl(null); // Close the menu
        setOpenProjectDetailsDialog(true); // Open the project details dialog
    };

    const handleCloseProjectDetailsDialog = () => {
        setOpenProjectDetailsDialog(false);
    };

    const handleOpenProjectUpdateDialog = () => {
        setOpenProjectUpdateDialog(true);
        setAnchorEl(null); // Close the menu when project update dialog opens
    };

    const handleCloseProjectUpdateDialog = () => {
        setOpenProjectUpdateDialog(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedProject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleProjectUpdate = () => {
        if (!selectedProject || !updatedProject.assignedDate || !updatedProject.dueDate || !updatedProject.projectDescription) return;

        const updatedProjects = projects.map(project => {
            if (project.id === selectedProject.id) {
                return {
                    ...project,
                    assignedDate: updatedProject.assignedDate,
                    dueDate: updatedProject.dueDate,
                    projectDescription: updatedProject.projectDescription
                };
            }
            return project;
        });

        setProjects(updatedProjects);
        setSnackbarOpen(true); // Display update success message
        handleCloseProjectUpdateDialog(); // Close update dialog
    };

    const handleDeleteConfirmationOpen = () => {
        setDeleteConfirmationOpen(true);
        setAnchorEl(null); // Close the menu when delete confirmation opens
    };

    const handleDeleteConfirmationClose = () => {
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteProject = () => {
        if (!selectedProject) return;

        const updatedProjects = projects.filter(project => project.id !== selectedProject.id);
        setProjects(updatedProjects);
        setSnackbarOpen(true); // Display delete success message
        handleDeleteConfirmationClose(); // Close delete confirmation dialog
    };

    const columns = [
        { name: 'id', label: 'Project ID' },
        { name: 'projectDescription', label: 'Project Description' },
        { name: 'assignedBy', label: 'Assigned By' },
        { name: 'assignedTo', label: 'Assigned To' },
        { name: 'assignedDate', label: 'Assigned Date' },
        { name: 'dueDate', label: 'Due Date' },
        {
            name: 'status',
            label: 'Status',
            options: {
                customBodyRender: (value) => (
                    <div>{value}</div>
                ),
            },
        },
        {
            name: 'action',
            label: 'Action',
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div>
                        <MdMoreVert onClick={(event) => handleMenuOpen(event, projects[tableMeta.rowIndex])} style={{ cursor: 'pointer' }} />
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={handleViewProjectDetails}>View Project</MenuItem>
                            <MenuItem onClick={handleOpenProjectUpdateDialog}>Update Project</MenuItem>
                            <MenuItem onClick={handleDeleteConfirmationOpen}>Delete Project</MenuItem>
                        </Popover>
                    </div>
                ),
            },
        },
    ];

    const options = {
        selectableRows: false,
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30],
        responsive: 'standard',
        customToolbar: () => (
            <Button
                onClick={handleOpenProjectForm}
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-gray-700 hover:text-blue-400 focus:outline-none transition duration-300 ease-in-out"
            >
                <MdOutlineAddTask className="text-xl" />
            </Button>
        ),
    };

    const getMuiTheme = () =>
        createTheme({
            typography: {

            },
            palette: {
                background: {
                    paper: '#fff',
                },
                mode: 'light',

            },
            components: {
                MuiTableCell: {
                    styleOverrides: {
                        root: {
                            fontWeight: 600,
                        },
                        head: {
                            padding: '14px 4px',
                        },
                        body: {
                            padding: '12px 15px',
                            color: '#000',
                        },
                    },
                },
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            fontWeight: 500,
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                        },
                    },
                },
            },
        });

    return (
        <div className="">
            <div className="mx-6 my-6 mt-6 mb-6">
                <ThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        title={'Project List'}
                        data={projects}
                        columns={columns}
                        options={options}
                    />
                </ThemeProvider>
            </div>

            {/* Project Creation Form Dialog */}
            <Dialog open={isProjectFormOpen} onClose={handleCloseProjectForm}>
                <DialogTitle>Add Project</DialogTitle>
                <DialogContent>
                    <AssignProjectForm onBack={handleCloseProjectForm} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProjectForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Project Details Dialog */}
            <Dialog open={openProjectDetailsDialog} onClose={handleCloseProjectDetailsDialog}>
                <DialogTitle>Project Details</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Project Description: {selectedProject?.projectDescription}
                    </Typography>
                    <Typography variant="body1">
                        Assigned By: {selectedProject?.assignedBy}
                    </Typography>
                    <Typography variant="body1">
                        Assigned To: {selectedProject?.assignedTo}
                    </Typography>
                    <Typography variant="body1">
                        Assigned Date: {selectedProject?.assignedDate}
                    </Typography>
                    <Typography variant="body1">
                        Due Date: {selectedProject?.dueDate}
                    </Typography>
                    <Typography variant="body1">
                        Status: {selectedProject?.status}
                    </Typography>
                    <Typography variant="body1">
                        Progress: {selectedProject?.progress}%
                    </Typography>
                    <Typography variant="body1">
                        Details: {selectedProject?.details}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProjectDetailsDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Project Update Dialog */}
            <Dialog open={openProjectUpdateDialog} onClose={handleCloseProjectUpdateDialog}>
                <DialogTitle>Update Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Assigned Date"
                        type="date"
                        name="assignedDate"
                        value={updatedProject.assignedDate}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Due Date"
                        type="date"
                        name="dueDate"
                        value={updatedProject.dueDate}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Project Description"
                        name="projectDescription"
                        value={updatedProject.projectDescription}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProjectUpdateDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleProjectUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
                <DialogTitle>Delete Project</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this project?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmationClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteProject} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for showing deletion message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Project deleted successfully!"
            />
        </div>
    );
};

export default ProjectTable;
