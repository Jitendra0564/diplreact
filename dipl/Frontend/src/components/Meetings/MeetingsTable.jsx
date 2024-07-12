import React, { useState, useEffect } from "react";
import {
  MdOutlineAddTask,
  MdMoreVert,
  MdNotifications,
  MdClose,
} from "react-icons/md";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close'; 
import AssigneMeetingsForm from "../../components/Meetings/AssignMeetingsForm";
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
  Snackbar,
  IconButton,
  TextField,
  Checkbox,
  ListItemText,
  Chip,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";

const MeetingsTable = () => {
  const [meetings, setMeetings] = useState([]);
  const [isMeetingsFormOpen, setMeetingsFormOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [openMeetingDetailsDialog, setOpenMeetingDetailsDialog] =
    useState(false); // State for meeting details dialog
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false); // State for schedule meeting dialog
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState(null);
  const [newMeetingData, setNewMeetingData] = useState({
    meetingName: "",
    meetingDescription: "",
    meetingDate: "",
    meetingTime: "",
    meetingType: "Individual", // Default meeting type
    hostedBy: "",
    selectedUsers: [], // Empty array for team members
  });
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State for delete confirmation dialog
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for showing messages
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");

  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    FetchMeetings();
    fetchUsers();
    fetchNotifications();
    checkForUpcomingMeetings();
    const intervalId = setInterval(checkForUpcomingMeetings, 60000); // Check every minute

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/users`);
      const data = response.data;
      setUserList(data.map((user) => user.name));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const FetchMeetings = async () => {
    try {
      const response = await axios.get(`${baseURL}/meetings`);
      //console.log(response.data);
      const meetingType = response.data.map((meeting, index) => {
        const meetingDate = formatDate(meeting.meetingDate);
        const hostedBy = meeting.hostedBy ? meeting.hostedBy.name : null;
        const selectedUsers = meeting.selectedUsers
          ? meeting.selectedUsers.map((user) => user.name).join(", ")
          : "No users selected";

        return {
          serialNumber: index + 1,
          _id: meeting._id,
          meetingName: meeting.meetingName,
          meetingDescription: meeting.meetingDescription,
          meetingWith: meeting.meetingWith,
          meetingDate,
          meetingTime: meeting.meetingTime,
          hostedBy,
          selectedUsers: selectedUsers,
        };
      });
      setMeetings(meetingType);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${baseURL}/meetings/notifications`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleOpenNotificationDialog = () => {
    setNotificationDialogOpen(true);
  };

  const handleCloseNotificationDialog = () => {
    setNotificationDialogOpen(false);
  };
  const handleOpenMeetingsForm = () => {
    setMeetingsFormOpen(true);
  };

  const handleCloseMeetingsForm = () => {
    setMeetingsFormOpen(false);
  };

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
      date: "",
      purpose: "",
      time: "",
      type: "Individual", // Reset to default meeting type
      hostedBy: "",
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
  const handleFilterMeeting = (type) => {
    setFilterType(type);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1); // Get tomorrow's date

    const filteredMeeting = meetings.filter((meeting) => {
      const meetingDate = new Date(meeting.meetingDate); // Ensure date parsing
      //const dueDate = new Date(task.DueDate); // Ensure date parsing

      if (type === "today") {
        return (
          (meetingDate >= startOfDay(today) &&
            meetingDate <= endOfDay(today)) ||
          (meetingDate >= startOfDay(today) && meetingDate <= endOfDay(today))
        );
      } else if (type === "tomorrow") {
        return (
          (meetingDate >= startOfDay(tomorrow) &&
            meetingDate <= endOfDay(tomorrow)) ||
          (meetingDate >= startOfDay(tomorrow) &&
            meetingDate <= endOfDay(tomorrow))
        );
      }
      return false;
    });
    setMeetings(filteredMeeting);
  };

  // Helper function to get the start of the day
  const startOfDay = (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
  };

  // Helper function to get the end of the day
  const endOfDay = (date) => {
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return end;
  };
  const handleScheduleMeeting = () => {
    // Add new meeting to the list
    const newMeeting = {
      id: meetings.length + 1,
      ...newMeetingData,
    };
    setMeetings([...meetings, newMeeting]);
    setSnackbarOpen(true); // Display success message
    scheduleNotifications();
    handleCloseScheduleDialog(); // Close schedule meeting dialog
  };

  const handleDeleteConfirmationOpen = () => {
    setDeleteConfirmationOpen(true);
    setAnchorEl(null); // Close the menu when delete confirmation opens
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteMeeting = async () => {
    if (!selectedMeeting) return;

    try {
      await axios.delete(`${baseURL}/meetings/${selectedMeeting._id}`);

      const updatedMeeting = meetings.filter(
        (meeting) => meeting._id !== selectedMeeting._id
      );
      setMeetings(updatedMeeting);
      setSnackbarMessage("Meeting successfully deleted!");
      setSnackbarColor("green");
      setSnackbarOpen(true);
      handleDeleteConfirmationClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setAlertMessage(error.response.data.msg);
        setAlertColor(error.response.data.color);
      } else {
        setAlertMessage("An error occurred while deleting the meeting.");
        setAlertColor("red");
      }
      console.error("Error deleting meeting:", error);
    }
  };

  const columns = [
    { name: "serialNumber", label: "serialNumber" },
    { name: "meetingName", label: "Meeting Name" },
    { name: "meetingDate", label: "Meeting Date" },
    { name: "meetingDescription", label: "Purpose" },
    { name: "meetingTime", label: "Meeting Time" },
    //{ name: 'type', label: 'Meeting Type' },
    { name: "hostedBy", label: "Hosted By" },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta) => (
          <div>
            <MdMoreVert
              onClick={(event) =>
                handleMenuOpen(event, meetings[tableMeta.rowIndex])
              }
              style={{ cursor: "pointer" }}
            />
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleViewMeetingDetails}>
                View Details
              </MenuItem>
              <MenuItem onClick={handleOpenScheduleDialog}>
                Schedule Meeting
              </MenuItem>
              <MenuItem onClick={handleDeleteConfirmationOpen}>
                Delete Meeting
              </MenuItem>
            </Popover>
          </div>
        ),
      },
    },
  ];
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const setRowProps = (row) => {
    const meetingDateString = row[2];
    const meetingDate = new Date(meetingDateString);
    const todayDate = new Date();

    let backgroundColor = "";

    if (
      meetingDate.getDate() === todayDate.getDate() &&
      meetingDate.getMonth() === todayDate.getMonth() &&
      meetingDate.getFullYear() === todayDate.getFullYear()
    ) {
      backgroundColor = "#a1c7ae";
    }

    return { style: { backgroundColor } };
  };

  const checkForUpcomingMeetings = () => {
    //console.log("Checking for upcoming meetings");
    //console.log("Current meetings:", meetings);
    const now = new Date();
    const upcomingMeetings = meetings.filter((meeting) => {
      const meetingDateTime = new Date(
        meeting.meetingDate + "T" + meeting.meetingTime
      );
      const timeDiff = meetingDateTime.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      return hoursDiff > 0 && hoursDiff <= 24; // Meetings within the next 24 hours
    });
    //console.log("Upcoming meetings:", upcomingMeetings);
    setUpcomingMeetings(upcomingMeetings);
    upcomingMeetings.forEach((meeting) => scheduleNotifications(meeting));
  };

  const scheduleNotifications = (meeting) => {
    //console.log("Scheduling notifications for meeting:", meeting);
    const now = new Date();
    const meetingDateTime = new Date(
      meeting.meetingDate + "T" + meeting.meetingTime
    );
    //console.log("Meeting date/time:", meetingDateTime);
    const timeDiff = meetingDateTime.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    console.log("Hours until meeting:", hoursDiff);

    if (hoursDiff > 1) {
      //console.log("Scheduling hourly reminders");
      // Schedule hourly reminders
      const hoursUntilNextHour = Math.ceil(hoursDiff) - hoursDiff;
      setTimeout(() => {
        sendNotification(
          `Reminder: "${meeting.meetingName}" start in ${Math.floor(hoursDiff)} hours`
        );
        const hourlyInterval = setInterval(() => {
          const hoursLeft = Math.floor(
            (meetingDateTime.getTime() - Date.now()) / (1000 * 60 * 60)
          );
          if (hoursLeft > 1) {
            sendNotification(
              `Reminder: "${meeting.meetingName}"meeting start in ${hoursLeft} hours`
            );
          } else {
            clearInterval(hourlyInterval);
          }
        }, 60 * 60 * 1000); // Every hour
      }, hoursUntilNextHour * 60 * 60 * 1000);
    }

    if (hoursDiff <= 1) {
      //console.log("Scheduling 5-minute reminders");
      // Schedule 5-minute reminders for the last hour
      const minutesUntilNextFiveMin = 5 - (new Date().getMinutes() % 5);
      setTimeout(() => {
        const fiveMinInterval = setInterval(() => {
          const minutesLeft = Math.floor(
            (meetingDateTime.getTime() - Date.now()) / (1000 * 60)
          );
          if (minutesLeft > 0) {
            sendNotification(
              `Reminder: "${meeting.meetingName}"meeting start in ${minutesLeft} minutes`
            );
          } else {
            sendNotification(`"${meeting.meetingName}"meeting is starting now!`);
            clearInterval(fiveMinInterval);
          }
        }, 5 * 60 * 1000); // Every 5 minutes
      }, minutesUntilNextFiveMin * 60 * 1000);
    }
  };

  const sendNotification = (message) => {
    console.log('Sending notification:', message);
    const id = new Date().getTime(); // Unique identifier based on the current timestamp
    const newNotification = { id, message };
    setNotifications((prev) => {
      console.log('Previous notifications:', prev);
      const newNotifications = [...prev, newNotification];
      console.log('New notifications:', newNotifications);
      return newNotifications;
    });
    // You can also implement browser notifications here if desired
    if (Notification.permission === 'granted') {
      new Notification(message);
    } else {
      console.log('Notification permission not granted');
    }
  };

  const deleteNotification = (id) => {
    console.log('Deleting notification with id:', id);
    setNotifications((prev) => {
      console.log('Previous notifications:', prev);
      const newNotifications = prev.filter((notification) => notification.id !== id);
      console.log('New notifications:', newNotifications);
      return newNotifications;
    });
  };

  const options = {
    setRowProps,
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30],
    responsive: "standard",
    customToolbar: () => (
      <Box
        display="flex"
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
            onClick={handleOpenMeetingsForm}
          >
            Assign Meeting
          </Button>
        </motion.div>
        <Box
          display="flex"
          alignItems="center"
          flexDirection={isSmallScreen ? "column" : "row"}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            style={{
              marginRight: "8px",
              marginBottom: isSmallScreen ? "8px" : "0",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleFilterMeeting("today")}
            >
              Today's Meetings
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            style={{
              marginRight: "8px",
              marginBottom: isSmallScreen ? "8px" : "0",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleFilterMeeting("tomorrow")}
            >
              Tomorrow's Meetings
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Badge
              badgeContent={notifications.length}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#1976d2", // Material-UI's default blue color
                  color: "white",
                },
              }}
            >
              <MdNotifications
                onClick={handleOpenNotificationDialog}
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#1976d2", // Material-UI's default blue color
                }}
              />
            </Badge>
          </motion.div>
        </Box>
      </Box>
    ),
  };

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
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
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
            title={"Meeting List"}
            data={meetings}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>

      {/*Meetings creation form*/}
      <Dialog open={isMeetingsFormOpen} onClose={handleCloseMeetingsForm}>
        <DialogTitle>Add Meeting</DialogTitle>
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
      <Dialog
        open={openMeetingDetailsDialog}
        onClose={handleCloseMeetingDetailsDialog}
      >
        <DialogTitle>Meeting Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Meeting Date:</strong> {selectedMeeting?.meetingDate}
          </Typography>
          <Typography variant="body1">
            <strong>Purpose: </strong>
            {selectedMeeting?.meetingDescription}
          </Typography>
          <Typography variant="body1">
            <strong>Meeting Time: </strong>
            {selectedMeeting?.meetingTime}
          </Typography>
          <Typography variant="body1">
            <strong>Meeting Type:</strong> {selectedMeeting?.meetingWith}
          </Typography>
          <Typography variant="body1">
            <strong>Meeting With:</strong>{" "}
            {String(selectedMeeting?.selectedUsers)}
          </Typography>
          {selectedMeeting?.meetingWith === "Team" &&
            selectedMeeting?.selectedUsers.length > 0 && (
              <Typography variant="body1">
                <strong>Team Members:</strong>
                {selectedMeeting.selectedUsers
                  .map((member) => member.name)
                  .join(", ")}
              </Typography>
            )}
          <Typography variant="body1">
            <strong>Hosted By: </strong>
            {selectedMeeting?.hostedBy}
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
          {newMeetingData.type === "Team" && (
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
                  <Checkbox
                    checked={newMeetingData.teamMembers.indexOf(user) > -1}
                  />
                  <ListItemText primary={user} />
                </MenuItem>
              ))}
            </TextField>
          )}
          {newMeetingData.type === "Individual" && (
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
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Delete Meeting</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this meeting?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteMeeting} color="primary">
            Delete
          </Button>
        </DialogActions>
        {/* Show the alert message if it's not empty */}
        {alertMessage && (
          <div style={{ color: alertColor }} ole="alert">
            {alertMessage}
          </div>
        )}
      </Dialog>

      {/* Notification Dialog */}
      <Dialog
        open={notificationDialogOpen}
        onClose={handleCloseNotificationDialog}
      >
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
            <div key={notification.id} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'black' }}>
              <Typography key={index}>
                {typeof notification === "string"
                  ? notification
                  : notification &&
                    typeof notification === "object" &&
                    notification.message
                  ? notification.message
                  : JSON.stringify(notification)}
              </Typography>
              <IconButton onClick={() => deleteNotification(notification.id)} color='red'>
                  <CloseIcon />
                </IconButton>
              </div>
            ))
          ) : (
            <Typography variant="body2">No notifications available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotificationDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for showing messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        ContentProps={{
          style: { backgroundColor: snackbarColor }, // Apply snackbarColor to background color
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <MdClose fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default MeetingsTable;
