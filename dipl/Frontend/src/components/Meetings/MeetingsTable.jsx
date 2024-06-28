import React, { useState, useEffect } from 'react';
import { MdOutlineAddTask, MdMoreVert } from 'react-icons/md';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AssigneMeetingsForm from '../../components/Meetings/AssignMeetingsForm'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Popover, MenuItem, Typography, Snackbar, TextField, Checkbox, ListItemText, Chip } from '@mui/material';

const MeetingsTable = () => {
    const [meetings, setMeetings] = useState([]);
    const [isMeetingsFormOpen, setMeetingsFormOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [openMeetingDetailsDialog, setOpenMeetingDetailsDialog] = useState(false); // State for meeting details dialog
    const [openScheduleDialog, setOpenScheduleDialog] = useState(false); // State for schedule meeting dialog
    const [newMeetingData, setNewMeetingData] = useState({
        date: '',
        purpose: '',
        time: '',
        type: 'Individual', // Default meeting type
        hostedBy: '',
        teamMembers: [], // Empty array for team members
    });
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State for delete confirmation dialog
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for showing messages

    useEffect(() => {
        // Mock meeting data
        const mockMeetings = generateMockMeetings(10);
        setMeetings(mockMeetings);
    }, []);

    const generateMockMeetings = (count) => {
        let mockMeetings = [];
        for (let i = 1; i <= count; i++) {
            const meetingType = getRandomMeetingType();
            const meetingData = {
                id: i,
                date: getRandomDate(),
                purpose: `Meeting ${i}`,
                time: getRandomTime(),
                type: meetingType,
                hostedBy: `User ${getRandomNumber(1, 10)}`,
                teamMembers: meetingType === 'Team' ? generateTeamMembers() : [],
            };
            mockMeetings.push(meetingData);
        }
        return mockMeetings;
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

    const getRandomTime = () => {
        const hours = getRandomNumber(8, 18); // Random hour between 8 AM and 6 PM
        const minutes = getRandomNumber(0, 59); // Random minute
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const getRandomMeetingType = () => {
        const meetingTypes = ['Individual', 'Team'];
        const randomIndex = Math.floor(Math.random() * meetingTypes.length);
        return meetingTypes[randomIndex];
    };

    const generateTeamMembers = () => {
        const memberCount = getRandomNumber(2, 5); // Generate 2 to 5 team members
        let members = [];
        for (let i = 1; i <= memberCount; i++) {
            members.push(`Team Member ${i}`);
        }
        return members;
    };
    const userList = ['User A', 'User B', 'User C', 'User D', 'User E'];

    const handleOpenMeetingsForm = () => {
        setMeetingsFormOpen(true);
    }

    const handleCloseMeetingsForm = () => {
        setMeetingsFormOpen(false)
    }

    const handleMenuOpen = (event, meeting) => {
        setAnchorEl(event.currentTarget);
        setSelectedMeeting(meeting);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleViewMeetingDetails = () => {
        setAnchorEl(null); // Close the menu
        setOpenMeetingDetailsDialog(true); // Open the meeting details dialog
    };

    const handleCloseMeetingDetailsDialog = () => {
        setOpenMeetingDetailsDialog(false);
    };

    const handleOpenScheduleDialog = () => {
        setAnchorEl(null); // Close the menu
        setOpenScheduleDialog(true); // Open the schedule meeting dialog
    };

    const handleCloseScheduleDialog = () => {
        setOpenScheduleDialog(false);
        setNewMeetingData({
            date: '',
            purpose: '',
            time: '',
            type: 'Individual', // Reset to default meeting type
            hostedBy: '',
            teamMembers: [],
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewMeetingData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleScheduleMeeting = () => {
        // Add new meeting to the list
        const newMeeting = {
            id: meetings.length + 1,
            ...newMeetingData,
        };
        setMeetings([...meetings, newMeeting]);
        setSnackbarOpen(true); // Display success message
        handleCloseScheduleDialog(); // Close schedule meeting dialog
    };

    const handleDeleteConfirmationOpen = () => {
        setDeleteConfirmationOpen(true);
        setAnchorEl(null); // Close the menu when delete confirmation opens
    };

    const handleDeleteConfirmationClose = () => {
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteMeeting = () => {
        if (!selectedMeeting) return;

        const updatedMeetings = meetings.filter((meeting) => meeting.id !== selectedMeeting.id);
        setMeetings(updatedMeetings);
        setSnackbarOpen(true); // Display success message
        handleDeleteConfirmationClose(); // Close delete confirmation dialog
    };

    const columns = [
        { name: 'id', label: 'Meeting ID' },
        { name: 'date', label: 'Meeting Date' },
        { name: 'purpose', label: 'Purpose' },
        { name: 'time', label: 'Meeting Time' },
        { name: 'type', label: 'Meeting Type' },
        { name: 'hostedBy', label: 'Hosted By' },
        {
            name: 'action',
            label: 'Action',
            options: {
                customBodyRender: (value, tableMeta) => (
                    <div>
                        <MdMoreVert onClick={(event) => handleMenuOpen(event, meetings[tableMeta.rowIndex])} style={{ cursor: 'pointer' }} />
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
                            <MenuItem onClick={handleViewMeetingDetails}>View Details</MenuItem>
                            <MenuItem onClick={handleOpenScheduleDialog}>Schedule Meeting</MenuItem>
                            <MenuItem onClick={handleDeleteConfirmationOpen}>Delete Meeting</MenuItem>
                        </Popover>
                    </div>
                ),
            },
        },
    ];

    const options = {
        selectableRows: 'none', 
        elevation: 0, 
        rowsPerPage: 5, 
        rowsPerPageOptions: [5, 10, 20, 30], 
        responsive: 'standard',
        customToolbar: () => (
            <Button
                onClick={handleOpenMeetingsForm}
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-gray-700 hover:text-blue-400 focus:outline-none transition duration-300 ease-in-out"
            >
                <MdOutlineAddTask className="text-xl" />
            </Button>
        ),
    };

    const getMuiTheme = () =>
        createTheme({
            typography: {},
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
                        title={'Meeting List'}
                        data={meetings}
                        columns={columns}
                        options={options}
                    />
                </ThemeProvider>
            </div>

            {/*Meetings creation form*/}
            <Dialog open={isMeetingsFormOpen} onClose={handleCloseMeetingsForm}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <AssigneMeetingsForm onBack={handleCloseMeetingsForm} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMeetingsForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Meeting Details Dialog */}
            <Dialog open={openMeetingDetailsDialog} onClose={handleCloseMeetingDetailsDialog}>
                <DialogTitle>Meeting Details</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Meeting Date: {selectedMeeting?.date}
                    </Typography>
                    <Typography variant="body1">
                        Purpose: {selectedMeeting?.purpose}
                    </Typography>
                    <Typography variant="body1">
                        Meeting Time: {selectedMeeting?.time}
                    </Typography>
                    <Typography variant="body1">
                        Meeting Type: {selectedMeeting?.type}
                    </Typography>
                    {selectedMeeting?.type === 'Team' && (
                        <Typography variant="body1">
                            Team Members: {selectedMeeting?.teamMembers.join(', ')}
                        </Typography>
                    )}
                    <Typography variant="body1">
                        Hosted By: {selectedMeeting?.hostedBy}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseMeetingDetailsDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Schedule Meeting Dialog */}
            <Dialog open={openScheduleDialog} onClose={handleCloseScheduleDialog}>
                <DialogTitle>Schedule Meeting</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Meeting Date"
                        type="date"
                        name="date"
                        value={newMeetingData.date}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Purpose"
                        name="purpose"
                        value={newMeetingData.purpose}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Meeting Time"
                        type="time"
                        name="time"
                        value={newMeetingData.time}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        select
                        label="Meeting Type"
                        name="type"
                        value={newMeetingData.type}
                        onChange={handleInputChange}
                        fullWidth
                    >
                        <MenuItem value="Individual">Individual</MenuItem>
                        <MenuItem value="Team">Team</MenuItem>
                    </TextField>
                    {newMeetingData.type === 'Team' && (
                        <TextField
                            margin="dense"
                            select
                            label="Team Members"
                            name="teamMembers"
                            value={newMeetingData.teamMembers}
                            onChange={handleInputChange}
                            fullWidth
                            SelectProps={{
                                multiple: true,
                                renderValue: (selected) => (
                                    <div>
                                        {selected.map((user) => (
                                            <Chip key={user} label={user} />
                                        ))}
                                    </div>
                                ),
                            }}
                        >
                            {userList.map((user) => (
                                <MenuItem key={user} value={user}>
                                    <Checkbox checked={newMeetingData.teamMembers.indexOf(user) > -1} />
                                    <ListItemText primary={user} />
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    {newMeetingData.type === 'Individual' && (
                        <TextField
                            margin="dense"
                            select
                            label="Select User"
                            name="selectedUser"
                            value={newMeetingData.selectedUser}
                            onChange={handleInputChange}
                            fullWidth
                        >
                            {userList.map((user) => (
                                <MenuItem key={user} value={user}>
                                    {user}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    <TextField
                        margin="dense"
                        label="Hosted By"
                        name="hostedBy"
                        value={newMeetingData.hostedBy}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseScheduleDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleScheduleMeeting} color="primary">
                        Schedule
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
                <DialogTitle>Delete Meeting</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this meeting?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirmationClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteMeeting} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for showing messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message="Meeting scheduled successfully!"
            />
        </div>
    );
};

export default MeetingsTable;
