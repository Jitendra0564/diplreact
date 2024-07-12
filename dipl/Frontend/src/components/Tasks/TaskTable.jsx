import React, { useState, useEffect } from "react";
import {
  MdOutlineAddTask,
  MdMoreVert,
  MdClose,
  MdNotifications,
} from "react-icons/md";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { motion } from "framer-motion";
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

import AssignTaskForm from "./AssignTaskForm";

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

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [isTaskFormOpen, setTaskFormOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openTaskDetailsDialog, setOpenTaskDetailsDialog] = useState(false);
  const [openTaskUpdateDialog, setOpenTaskUpdateDialog] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: "",
    assignDate: "",
    DueDate: "",
    description: "",
    assignedTo: "",
    status: "",
  });
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [newScheduledDate, setNewScheduledDate] = useState("");
  const [newRescheduledDate, setNewreScheduledDate] = useState("");
  const [rescheduleRemarks, setRescheduleRemarks] = useState("");
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [taskHistory, setTaskHistory] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [notifications, setNotifications] = useState([]);
  
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    fetchData();
    fetchUsers();
    fetchNotifications();
  }, []);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/tasks`);
      const formattedData = response.data.map((task, index) => {
        const createdBy = task.createdBy
          ? Array.isArray(task.createdBy)
            ? task.createdBy.map((user) => `${user.name}`)
            : `${task.createdBy.name}`
          : null;

        const assignedTo = task.assignedTo
          ? Array.isArray(task.assignedTo)
            ? task.assignedTo.map((user) => `${user.name}`)
            : `${task.assignedTo.name}`
          : null;

        // Format assignDate and dueDate
        const assignDate = formatDate(task.assignDate);
        const DueDate = formatDate(task.DueDate);

        // Check if the task has a history
        const eventDate =
          task.history.length > 0 ? formatDate(task.history[0].eventDate) : "";

        // Check if the task is expired
        const currentDate = new Date();
        const dueDateObj = new Date(task.DueDate);
        const status =
          (task.status === "Pending" || task.status === "In Progress") &&
          currentDate > dueDateObj
            ? "Cancelled"
            : task.status;

        return {
          serialNumber: index + 1,
          _id: task._id,
          title: task.title,
          description: task.description,
          createdBy,
          assignedTo,
          assignDate,
          DueDate,
          status: status,
          eventDate: eventDate, // Include the eventDate from history
        };
      });

      setTasks(formattedData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${baseURL}/tasks/notifications`);
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

  const handleApproveReschedule = async (notification) => {
    try {
      // Open the reschedule dialog with the notification details
      handleRescheduleDialogOpen(notification);
    } catch (error) {
      console.error('Error approving reschedule request:', error);
    }
  };
  
  
  const handleRejectReschedule = async (notification) => {
    try {
      //console.log("In Reject Notification",notification);
      await axios.post(`${baseURL}/tasks/${notification.task}/reject-reschedule`);
      
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      console.error('Error rejecting reschedule request:', error);
    }
  };

  const handleRequestReschedule = async () => {
    try {
      await axios.post(`${baseURL}/tasks/${selectedTask._id}/request-reschedule`);
      setSnackbarMessage("Reschedule request sent successfully!");
      setSnackbarOpen(true);
      setSnackbarColor("blue");
      handleMenuClose();
    } catch (error) {
      console.error("Error requesting reschedule:", error);
      setSnackbarMessage("Failed to send reschedule request");
      setSnackbarOpen(true);
      setSnackbarColor("red");
    }
  };

  const handleRescheduleDialogOpen = (notification) => {
    setSelectedTask(notification.task);
    setNewreScheduledDate(''); // Reset date
    setRescheduleRemarks(''); // Reset remarks
    setRescheduleDialogOpen(true);
  };
  

  const handleRescheduleDialogClose = () => {
    setRescheduleDialogOpen(false);
  };
  const handleRescheduleTask = async () => {
    if (!selectedTask || !newRescheduledDate) return;
  
    try {
      //console.log("Task Id",selectedTask);
      const response = await axios.put(
        `${baseURL}/tasks/${selectedTask}/reschedule`,
        {
          DueDate: newRescheduledDate,
          remarks: rescheduleRemarks,
        }
      );
  
      const updatedTasks = tasks.map((task) => {
        if (task._id === selectedTask._id) {
          return {
            ...task,
            DueDate: formatDate(newRescheduledDate),
            status: "Pending", // Reset status to Pending
          };
        }
        return task;
      });
  
      setTasks(updatedTasks);
      setSnackbarMessage("Task rescheduled successfully!");
      setSnackbarOpen(true);
      setSnackbarColor("green");
      handleRescheduleDialogClose();
  
      // Remove the notification related to the rescheduled task
      const updatedNotifications = notifications.filter(
        (notification) => notification.task !== selectedTask._id
      );
      setNotifications(updatedNotifications);
  
      fetchData(); // Refresh the task list
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      console.error("Error rescheduling task:", error);
    }
  };
  
  const handleOpenTaskForm = () => {
    setTaskFormOpen(true);
  };

  const handleCloseTaskForm = () => {
    setTaskFormOpen(false);
  };
  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleViewTaskDetails = () => {
    setAnchorEl(null);
    setOpenTaskDetailsDialog(true);
  };

  const handleCloseTaskDetailsDialog = () => {
    setOpenTaskDetailsDialog(false);
  };
  const handleFilterTasks = (type) => {
    setFilterType(type);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1); // Get tomorrow's date

    const filteredTasks = tasks.filter((task) => {
      const assignDate = new Date(task.assignDate); // Ensure date parsing
      const dueDate = new Date(task.DueDate); // Ensure date parsing

      if (type === "today") {
        return (
          (assignDate >= startOfDay(today) && assignDate <= endOfDay(today)) ||
          (dueDate >= startOfDay(today) && dueDate <= endOfDay(today))
        );
      } else if (type === "tomorrow") {
        return (
          (assignDate >= startOfDay(tomorrow) &&
            assignDate <= endOfDay(tomorrow)) ||
          (dueDate >= startOfDay(tomorrow) && dueDate <= endOfDay(tomorrow))
        );
      }
      return false;
    });
    setTasks(filteredTasks);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const statusOptions = ["Pending", "In Progress", "Completed", "Cancelled", "Done"];

  
  const handleOpenTaskUpdateDialog = () => {
    setUpdatedTask({
      title: selectedTask.title,
      description: selectedTask.description,
      status: selectedTask.status,
      assignDate: formatDate(selectedTask.assignDate),
      DueDate: formatDate(selectedTask.DueDate),
      assignedTo: selectedTask.assignedTo,
    });
    setOpenTaskUpdateDialog(true);
    setAnchorEl(null);
  };

  const handleCloseTaskUpdateDialog = () => {
    setOpenTaskUpdateDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleScheduleDialogOpen = () => {
    if (!selectedTask || selectedTask.eventDate) {
      setSnackbarMessage("Task has already been scheduled.");
      setSnackbarOpen(true);
      return;
    }
    setScheduleDialogOpen(true);
    setAnchorEl(null);
  };

  const handleScheduleDialogClose = () => {
    setScheduleDialogOpen(false);
  };

  const handleScheduleTask = async () => {
    if (!selectedTask || !newScheduledDate) return;

    try {
      const response = await axios.post(
        `${baseURL}/tasks/${selectedTask._id}/schedule`,
        {
          eventDate: newScheduledDate,
        }
      );

      const updatedTasks = tasks.map((task) => {
        if (task._id === selectedTask._id) {
          return {
            ...task,
            eventDate: formatDate(newScheduledDate),
          };
        }
        return task;
      });

      setTasks(updatedTasks);
      setSnackbarMessage("Task scheduled successfully!");
      setSnackbarOpen(true);
      setSnackbarColor("gray");
      handleScheduleDialogClose();
    } catch (error) {
      console.error("Error scheduling task:", error);
    }
  };


  const handleTaskUpdate = async () => {
    if (
      !selectedTask ||
      !updatedTask.title ||
      !updatedTask.assignDate ||
      !updatedTask.DueDate ||
      !updatedTask.description ||
      !updatedTask.status
    )
      return;

    try {
      const response = await axios.put(`${baseURL}/tasks/${selectedTask._id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        assignDate: updatedTask.assignDate,
        DueDate: updatedTask.DueDate,
        //assignedTo: updatedTask.assignedTo,
      });

      const updatedTasks = tasks.map((task) => {
        if (task._id === selectedTask._id) {
          const assignedToUser = users.find(
            (user) => user._id === updatedTask.assignedTo
          );
          return {
            ...task,
            title: updatedTask.title,
            description: updatedTask.description,
            status: updatedTask.status,
            assignDate: updatedTask.assignDate,
            DueDate: updatedTask.DueDate,
            assignedTo: task.assignedTo,
          };
        }
        return task;
      });

      setTasks(updatedTasks);
      setSnackbarMessage("Task updated successfully!");
      setSnackbarOpen(true);
      setSnackbarColor("teal");
      handleCloseTaskUpdateDialog();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setAlertMessage(error.response.data.msg);
        setAlertColor(error.response.data.color);
      } else {
        setAlertMessage("An error occurred while updating the task.");
        setAlertColor("red");
      }
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteConfirmationOpen = () => {
    setDeleteConfirmationOpen(true);
    setAnchorEl(null);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteTask = async () => {
    if (!selectedTask) return;

    try {
      await axios.delete(`${baseURL}/tasks/${selectedTask._id}`);

      const updatedTasks = tasks.filter(
        (task) => task._id !== selectedTask._id
      );
      setTasks(updatedTasks);
      setSnackbarMessage("Task successfully deleted!");
      setSnackbarColor("green");
      setSnackbarOpen(true);
      handleDeleteConfirmationClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setAlertMessage(error.response.data.msg);
        setAlertColor(error.response.data.color);
      } else {
        setAlertMessage("An error occurred while deleting the task.");
        setAlertColor("red");
      }
      console.error("Error deleting task:", error);
    }
  };

  

  const handleOpenHistoryDialog = async (task) => {
    setSelectedTask(task);
    try {
      const response = await axios.get(`${baseURL}/tasks/${task._id}/history`);
      setTaskHistory(response.data);
      setHistoryDialogOpen(true);
    } catch (error) {
      console.error("Error fetching task history:", error);
    }
    setAnchorEl(null);
  };

  const handleCloseHistoryDialog = () => {
    setHistoryDialogOpen(false);
  };

  const columns = [
    { name: "serialNumber", label: "serialNumber" },
    // { name: '_id', label: 'Task ID' },
    { name: "title", label: "Title" },
    { name: "description", label: "Task Description" },
    {
      name: "createdBy",
      label: "Assigned By",
      options: {
        customBodyRender: (value) =>
          value === null
            ? "N/A"
            : Array.isArray(value)
            ? value.join(", ")
            : value,
      },
    },
    {
      name: "assignedTo",
      label: "Assigned To",
      options: {
        customBodyRender: (value) =>
          value === null
            ? "N/A"
            : Array.isArray(value)
            ? value.join(", ")
            : value,
      },
    },
    { name: "assignDate", label: "Assigned Date" },
    { name: "DueDate", label: "Due Date" },
    { name: "status", label: "Status" },
    { name: "eventDate", label: "Scheduled Date" },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta) => {
          const task = tasks[tableMeta.rowIndex];
          const isExpired = task.status === "Cancelled";

          return (
            <div>
              <MdMoreVert
                onClick={(event) => handleMenuOpen(event, task)}
                style={{ cursor: "pointer" }}
              />
              <Popover
                open={
                  Boolean(anchorEl) &&
                  selectedTask &&
                  selectedTask._id === task._id
                }
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
                {isExpired ? (
                   <MenuItem onClick={handleRequestReschedule}>
                   Reschedule Task
                 </MenuItem>
                ) : (
                  <>
                  <MenuItem onClick={handleViewTaskDetails}>
                      View Task
                    </MenuItem>
                    <MenuItem onClick={handleOpenTaskUpdateDialog}>
                      Update Task
                    </MenuItem>
                    <MenuItem onClick={handleDeleteConfirmationOpen}>
                      Delete Task
                    </MenuItem>
                    
                  {!task.eventDate && (
                      <MenuItem onClick={handleScheduleDialogOpen}>
                        Schedule Task
                      </MenuItem>
                    )}              
                    <MenuItem onClick={() => handleOpenHistoryDialog(task)}>
                      View History
                    </MenuItem>
                  </>
                )}
              </Popover>
            </div>
          );
        },
      },
    },
  ];

  const setRowProps = (row) => {
    const status = row[7];
    const scheduledStatus = row[8];
    let backgroundColor = "";

    if (scheduledStatus === "Scheduled") {
      backgroundColor = "#C7D36F";
    } else if (scheduledStatus === "Rescheduled") {
      backgroundColor = "#9EB23B";
    } else {
      switch (status) {
        case "Pending":
          backgroundColor = "#fff3cd";
          break;
        case "In Progress":
          backgroundColor = "#cce5ff";
          break;
        case "Completed":
          backgroundColor = "#6CB78A";
          break;
        case "Cancelled":
          backgroundColor = "#ffe6cc";
          break;
          case "Done":
            backgroundColor = "#6ea985";
            break;
        default:
          backgroundColor = "";
      }
    }

    return { style: { backgroundColor } };
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
            onClick={handleOpenTaskForm}
          >
            Add Task
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
              marginRight: isSmallScreen ? "0" : "8px",
              marginBottom: isSmallScreen ? "8px" : "0",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleFilterTasks("today")}
            >
              Today's Task
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
              onClick={() => handleFilterTasks("tomorrow")}
            >
              Tomorrow's Task
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

  return (
    <div className="">
      <div className="mx-6 my-6 mt-6 mb-6">
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title="Task List"
            data={tasks}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>

      {/* Task Creation Form Dialog */}
      <Dialog open={isTaskFormOpen} onClose={handleCloseTaskForm}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <AssignTaskForm onBack={handleCloseTaskForm} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskForm} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Task Details Dialog */}
     <Dialog
        open={openTaskDetailsDialog}
        onClose={handleCloseTaskDetailsDialog}
      >
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <strong>Task Title: </strong> {selectedTask?.title}
          </Typography>
          <Typography variant="body1">
            <strong> Task ID:</strong> {selectedTask?._id}
          </Typography>
          <Typography variant="body1">
            <strong> Task Description:</strong> {selectedTask?.description}
          </Typography>
          <Typography variant="body1">
            <strong>Assigned By: </strong> {selectedTask?.createdBy}
          </Typography>
          <Typography variant="body1">
            <strong>Assigned To: </strong>
            {selectedTask?.assignedTo}
          </Typography>
          <Typography variant="body1">
            <strong>Assigned Date: </strong> {selectedTask?.assignDate}
          </Typography>
          <Typography variant="body1">
            <strong>Due Date:</strong> {selectedTask?.DueDate}
          </Typography>
          <Typography variant="body1">
            <strong>Status: </strong> {selectedTask?.status}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskDetailsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>  

      {/* Task Update Dialog */}
      <Dialog open={openTaskUpdateDialog} onClose={handleCloseTaskUpdateDialog}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            value={updatedTask.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={updatedTask.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            //select
            name="assignedTo"
            label="Assigned To"
            value={updatedTask.assignedTo}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="assignDate"
            label="Assign Date"
            type="date"
            value={updatedTask.assignDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="DueDate"
            label="Due Date"
            type="date"
            value={updatedTask.DueDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            name="status"
            label="Status"
            value={updatedTask.status}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskUpdateDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTaskUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
        {alertMessage && (
          <div style={{ color: alertColor }} role="alert">
            {alertMessage}
          </div>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTask} color="primary">
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

      {/* Schedule Task Dialog */}
      <Dialog open={scheduleDialogOpen} onClose={handleScheduleDialogClose}>
        <DialogTitle>Schedule Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Scheduled Date"
            type="date"
            value={newScheduledDate}
            onChange={(e) => setNewScheduledDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScheduleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleScheduleTask} color="primary">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reschedule Task Dialog */}
      <Dialog open={rescheduleDialogOpen} onClose={handleRescheduleDialogClose}>
        <DialogTitle>Reschedule Task</DialogTitle>
        <DialogContent>
          <TextField
            label="New Scheduled Date"
            type="date"
            value={newRescheduledDate}
            onChange={(e) => setNewreScheduledDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Reschedule Remarks"
            value={rescheduleRemarks}
            onChange={(e) => setRescheduleRemarks(e.target.value)}
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRescheduleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRescheduleTask} color="primary">
            Reschedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* View History Dialog */}
      <Dialog open={historyDialogOpen} onClose={handleCloseHistoryDialog}>
        <DialogTitle>Task History</DialogTitle>
        <DialogContent>
          {taskHistory && taskHistory.length > 0 ? (
            <ul>
              {taskHistory.map((historyItem) => (
                <li key={historyItem._id}>
                  <Typography variant="body2">
                    <strong>Date:</strong> {formatDate(historyItem.eventDate)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Event Type:</strong> {historyItem.eventType}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Remarks:</strong> {historyItem.remarks}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Done By:</strong> {historyItem.user.name}
                  </Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No history available for this task.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHistoryDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reschedule Task Dialog */}
      <Dialog open={rescheduleDialogOpen} onClose={handleRescheduleDialogClose}>
        <DialogTitle>Reschedule Task</DialogTitle>
        <DialogContent>
          <TextField
            label="New Scheduled Date"
            type="date"
            value={newRescheduledDate}
            onChange={(e) => setNewreScheduledDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Reschedule Remarks"
            value={rescheduleRemarks}
            onChange={(e) => setRescheduleRemarks(e.target.value)}
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRescheduleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick ={handleRescheduleTask} color="primary">
            Reschedule
          </Button>
        </DialogActions>
      </Dialog>

     {/* View Notification Dialog */}
     <Dialog open={notificationDialogOpen} onClose={handleCloseNotificationDialog}>
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          {notifications && notifications.length > 0 ? (
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>
                  <Typography variant="body2" color="blue" >
                    {notification.type === "reschedule_request"
                      ? "Task Reschedule Request"
                      : "Notification"}
                    : {notification.message}
                  </Typography>
                  {notification.type === "reschedule_request" && (
                    <DialogActions>
                      <Button onClick={() =>  handleRescheduleDialogOpen(notification)} color="primary">
                        Approve
                      </Button>
                      <Button onClick={() => handleRejectReschedule(notification)} color="secondary">
                        Reject
                      </Button>
                    </DialogActions>
                  )}
                </li>
              ))}
            </ul>
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
      {/* Snackbar for showing deletion or scheduling message */}
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

export default TaskTable;
