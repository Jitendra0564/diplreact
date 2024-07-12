import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Modal, Box, Button } from "@mui/material";
import personalscore from "../../assets/personalscore.png";
import ptasks from "../../assets/ptask.png";
import ttasks from "../../assets/totaltask.png";
import umeetings from "../../assets/upcommingmettings.png";
import meeting from "../../assets/meetings.png";
import etask from "../../assets/etask.png";
import temployees from "../../assets/temployees.png";
import totalptask from "../../assets/totalptask.png";
import completedtask from "../../assets/completedtask.png";
import rtcomplition from "../../assets/rtcomplition.png";
import { motion } from "framer-motion";

const AdminPannelGrid = () => {
  const [totalTasks, setTotalTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [expiredTasks, setExpiredTasks] = useState([]);
  const [TaskAssign, setTaskAssign] = useState([]);
  const [InProgressTasks, setInProgress] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState([]);
  const [totalCompanies, setTotalCompanies] = useState([]);
  const [totalMeetings, setTotalMeetings] = useState([]);
  const [visibleTaskList, setVisibleTaskList] = useState(null);
  const [completionRate, setCompletionRate] = useState(0);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Function to get the value of a cookie by name
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const isAdmin = getCookieValue("isAdmin") === "true";
  const token = getCookieValue("token");
  const currentUser = getCookieValue("currentUser");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksResponse, employeesResponse, companiesResponse, meetingsResponse] =
          await Promise.all([
            axios.get(`${baseURL}/tasks`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${baseURL}/users`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${baseURL}/companies`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${baseURL}/meetings`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        const allTasks = tasksResponse.data;
        setTotalTasks(allTasks);
        setCompletedTasks(
          allTasks.filter((task) => task.status === "Completed")
        );

        setPendingTasks(allTasks.filter((task) => task.status === "Pending"));
        setExpiredTasks(allTasks.filter((task) => task.status === "Cancelled"));
        setInProgress(allTasks.filter((task) => task.status === "In Progress"));
        setTaskAssign(
          allTasks.filter(
            (task) =>
              task.createdBy.name === currentUser &&
              currentUser !== task.assignedTo.name
          )
        );
        setTotalEmployees(employeesResponse.data);
        setTotalCompanies( companiesResponse.data);
        setTotalMeetings(meetingsResponse.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [isAdmin, token]);

  useEffect(() => {
    setCompletionRate((completedTasks.length / totalTasks.length) * 100);
  }, [completedTasks, totalTasks]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Assuming `totalMeetings` is an array of meeting objects with a `meetingDate` property
  const upcomingMeetings = totalMeetings.filter(meeting => new Date(meeting.meetingDate) > new Date());


  const renderTaskTitles = () => {
    let data = [];
    switch (visibleTaskList) {
      case "total":
        data = totalTasks;
        break;
      case "Pending":
        data = pendingTasks;
        break;
      case "Cancelled":
        data = expiredTasks;
        break;
      case "In Progress":
        data = InProgressTasks;
        break;
      case "Completed":
        data = completedTasks;
        break;
      case "TaskAssignBy":
        data = TaskAssign;
        break;
      case "Employees":
        data = totalEmployees;
        break;
      case "Companies":
        data = totalCompanies;
        break;
      case "Meetings":
        data = totalMeetings;
        break;
      case "UpcomingMeetings":
        data = upcomingMeetings;
        break;
      default:
        data = [];
    }
    return (
      <>
        {data.map((item, index) => (
          <div key={item._id} className="mb-2">
            <Typography variant="body1">{`${index + 1}. ${item.title || item.name || item.meetingName}`}</Typography>
            {item.description && (
              <Typography variant="body2" style={{ fontWeight: "bold", color: "black" }}>
                {item.description}
              </Typography>
            )}
            {item.email && (
              <Typography variant="body2">{item.email}</Typography>
            )}
            {item.meetingDate && (
              <Typography variant="body2">{formatDate(item.meetingDate)}</Typography>
            )}
          </div>
        ))}
      </>
    );
  };

  const toggleTaskList = (listType) => {
    setVisibleTaskList(listType);
  };

  const closeModal = () => {
    setVisibleTaskList(null);
  };

  return (
    <>
      <section className="py-20 bg-gray-300 h-screen overflow-y-scroll">
        <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <ul className="space-y-8">
              <li className="text-sm leading-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg  ring-1 bg-white shadow-lg hover:bg-gray-100 ring-gray-900/5">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center">
                          <img
                            src={ttasks}
                            className="w-12 h-10 bg-center bg-cover "
                            alt="Tasks"
                          />
                          <div className="p-3">
                            <h3 className="text-lg font-semibold text-black">
                              {" "}
                              {isAdmin
                                ? "Total Tasks"
                                : "Tasks Assigned to You"}
                            </h3>
                            <p className="text-gray-500 text-md">
                              Admin &amp; Employee
                            </p>
                          </div>
                        </div>
                        <h4 className=" text-gray-500 font-bold text-xl">
                          {" "}
                          {totalTasks.length}
                        </h4>
                      </div>
                      <button
                        className="w-full text-sky-600 bg-sky-200 hover:bg-sky-300 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        onClick={() => toggleTaskList("total")}
                      >
                        View List
                      </button>
                    </div>
                  </a>
                </motion.div>
              </li>
              <li className="text-sm leading-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src={personalscore}
                          className="w-15 h-12 bg-center bg-cover "
                          alt="Score"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-black">
                            personal score
                          </h3>
                          <p className="text-gray-500 text-md">Admin Score</p>
                        </div>
                      </div>

                      <h1 className=" text-gray-900 font-bold text-8xl text-center ">
                        99<span className="text-sm font-bold">%</span>
                      </h1>
                    </div>
                  </a>
                </motion.div>
              </li>
              <li className="text-sm leading-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center">
                          <img
                            src={ptasks}
                            className="w-12 h-10 bg-center bg-cover "
                            alt="Tasks"
                          />
                          <div className="p-3">
                            <h3 className="text-lg font-semibold text-black">
                              Pending Tasks
                            </h3>
                            <p className="text-gray-500 text-md"> Employee</p>
                          </div>
                        </div>

                        <h4 className=" text-gray-500 font-bold text-xl">
                          {" "}
                          {pendingTasks.length}
                        </h4>
                      </div>
                      <button
                        className="w-full text-purple-600 bg-purple-200 hover:bg-purple-300 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        onClick={() => toggleTaskList("Pending")}
                      >
                        View List
                      </button>
                    </div>
                  </a>
                </motion.div>
              </li>
              <li className="text-sm leading-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white shadow-lg ring-1 hover:bg-gray-100 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src={umeetings}
                          className="w-15 h-12 bg-center bg-cover "
                          alt="Score"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-black">
                            Upcomming Meetings
                          </h3>
                          <p className="text-gray-500 text-md">Your Meetings</p>
                        </div>
                      </div>

                      <h1 className=" text-gray-900 font-bold text-8xl text-center ">
                        
                          {upcomingMeetings.length}
                      
                      </h1>
                      <button
                        className="w-full text-lime-600 bg-lime-300 hover:bg-lime-400 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        onClick={() => toggleTaskList("UpcomingMeetings")}
                      >
                        View List
                      </button>
                    </div>
                  </a>
                </motion.div>
              </li>
            </ul>

            <ul className=" space-y-8 sm:block">
              <li className="text-sm leading-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center">
                          <img
                            src={meeting}
                            className="w-12 h-10 bg-center bg-cover "
                            alt="Tasks"
                          />
                          <div className="p-3">
                            <h3 className="text-lg font-semibold text-balck">
                              Total Meetings
                            </h3>
                            <p className="text-gray-500 text-md">
                              Held Meetings
                            </p>
                          </div>
                        </div>

                        <h4 className=" text-gray-500 font-bold text-xl">
                          {totalMeetings.length}
                        </h4>
                      </div>
                      <button
                        className="w-full text-sky-600 bg-sky-200 hover:bg-sky-300 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        onClick={() => toggleTaskList("Meetings")}
                      >
                        View List
                      </button>
                    </div>
                  </a>
                </motion.div>
              </li>
              <li className="text-sm leading-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center">
                          <img
                            src={etask}
                            className="w-12 h-10 bg-center bg-cover "
                            alt="Tasks"
                          />
                          <div className="p-3">
                            <h3 className="text-lg font-semibold text-dark">
                              Expired Tasks
                            </h3>
                            <p className="text-gray-500 text-md"> Employee</p>
                          </div>
                        </div>

                        <h4 className=" text-gray-500 font-bold text-xl">
                          {expiredTasks.length}
                        </h4>
                      </div>
                      <button
                        className="w-full text-red-600 bg-red-200 hover:bg-red-300 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        onClick={() => toggleTaskList("Cancelled")}
                      >
                        View List
                      </button>
                    </div>
                  </a>
                </motion.div>
              </li>
              {isAdmin && (
                <li className="text-sm leading-6">
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <a href="#" className="cursor-pointer">
                      <div className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                        <div className="flex items-center space-x-4">
                          <img
                            src={temployees}
                            className="w-15 h-12 bg-center bg-cover "
                            alt="Score"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-dark">
                              Total Employees
                            </h3>
                            <p className="text-gray-500 text-md">
                              Employee number-
                            </p>
                          </div>
                        </div>

                        <h1 className=" text-gray-900 font-bold text-8xl text-center ">
                          {totalEmployees.length}
                          <span className="text-sm font-bold">-Only</span>
                        </h1>
                        <button
                          className="w-full text-sky-600 bg-sky-200 hover:bg-sky-300 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                          onClick={() => toggleTaskList("Employees")}
                        >
                          View List
                        </button>
                      </div>
                    </a>
                  </motion.div>
                </li>
              )}
              <li className="text-sm leading-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white ring-1 hover:bg-gray-100 ring-gray-900/5">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center">
                          <img
                            src={totalptask}
                            className="w-12 h-10 bg-center bg-cover "
                            alt="Tasks"
                          />
                          <div className="p-3">
                            <h3 className="text-lg font-semibold text-black">
                              In Progress Tasks
                            </h3>
                            <p className="text-gray-500 text-md"> Employee</p>
                          </div>
                        </div>
                        <h4 className=" text-gray-500 font-bold text-xl">
                          {InProgressTasks.length}
                        </h4>
                      </div>
                      <button
                        className="w-full text-yellow-600 bg-yellow-200 hover:bg-yellow-300 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        onClick={() => toggleTaskList("In Progress")}
                      >
                        View List
                      </button>
                    </div>
                  </a>
                </motion.div>
              </li>
            </ul>
            <ul className=" space-y-8 sm:block">
              <li className="text-sm leading-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white hover:bg-gray-100 ring-1 ring-gray-900/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src={rtcomplition}
                          className="w-15 h-12 bg-center bg-cover"
                          alt="Score"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-black">
                            Rate Of Task Completion
                          </h3>
                          <p className="text-gray-500 text-md">
                            Completion Rate
                          </p>
                        </div>
                      </div>
                      <h1 className=" text-gray-900 font-bold text-8xl text-center ">
                        {Math.round(completionRate)}
                        <span className="text-sm font-bold">%</span>
                      </h1>
                    </div>
                  </a>
                </motion.div>
              </li>
              <li className="text-sm leading-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white  hover:bg-gray-100 ring-1 ring-gray-900/5">
                      <div className="flex items-center justify-between space-x-9">
                        <div className="flex items-center">
                          <img
                            src={completedtask}
                            className="w-12 h-10 bg-center bg-cover"
                            alt="Tasks"
                          />
                          <div className="p-3">
                            <h3 className="text-lg font-semibold text-black">
                              Completed Tasks
                            </h3>
                            <p className="text-gray-500 text-md"> Employee</p>
                          </div>
                        </div>
                        <h4 className=" text-gray-500 font-bold text-xl">
                          {completedTasks.length}
                        </h4>
                      </div>
                      <button
                        className="w-full text-green-600 bg-green-300 hover:bg-green-400 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        onClick={() => toggleTaskList("Completed")}
                      >
                        View List
                      </button>
                    </div>
                  </a>
                </motion.div>
              </li>

              {isAdmin && (
                <li className="text-sm leading-6">
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <a href="#" className="cursor-pointer">
                      <div className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white hover:bg-gray-100 ring-1 ring-gray-900/5">
                        <div className="flex items-center space-x-4">
                          <img
                            src={temployees}
                            className="w-15 h-12 bg-center bg-cover"
                            alt="Score"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-black">
                              Total Companies
                            </h3>
                            <p className="text-gray-500 text-md">Companies</p>
                          </div>
                        </div>
                        <h1 className="text-gray-900 font-bold text-8xl text-center">
                          {totalCompanies.length}
                          <span className="text-sm font-bold">-Only</span>
                        </h1>
                        <button
                          className="w-full text-sky-600 bg-sky-200 hover:bg-sky-300 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                          onClick={() => toggleTaskList("Companies")}
                        >
                          View List
                        </button>
                      </div>
                    </a>
                  </motion.div>
                </li>
              )}
              <li className="text-sm leading-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <a href="#" className="cursor-pointer">
                    <div className="relative p-6 space-y-6 leading-none rounded-lg shadow-lg bg-white hover:bg-gray-100 ring-1  ring-gray-900/5">
                      <div className="flex items-center justify-between space-x-9">
                        <div className="flex items-center">
                          <img
                            src={ptasks}
                            className="w-12 h-10 bg-center bg-cover "
                            alt="Tasks"
                          />
                          <div className="p-3">
                            <h3 className="text-lg font-semibold text-black">
                              Tasks Assign By You
                            </h3>
                            <p className="text-gray-500 text-md"> Employee</p>
                          </div>
                        </div>

                        <h4 className=" text-gray-500 font-bold text-xl">
                          {TaskAssign.length}
                        </h4>
                      </div>
                      <button
                        className="w-full text-fuchsia-600 bg-fuchsia-300 hover:bg-fuchsia-400 text-sm py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        onClick={() => toggleTaskList("TaskAssignBy")}
                      >
                        View List
                      </button>
                    </div>
                  </a>
                </motion.div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modal for displaying task lists */}
      <Modal
        open={visibleTaskList !== null}
        onClose={closeModal}
        aria-labelledby="task-list-modal-title"
        aria-describedby="task-list-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "auto", md: "auto", lg: "auto" },
            minWidth: "300px", // Ensures a minimum width
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            maxHeight: "80vh", // Set maximum height for the modal content
            overflowY: "auto", // Enable vertical scrolling
          }}
        >
          <Typography id="task-list-modal-title" variant="h6" component="h2">
            {visibleTaskList === "total"
              ? "Total Tasks"
              : visibleTaskList === "Completed"
              ? "Completed Tasks"
              : visibleTaskList === "Pending"
              ? "Pending Tasks"
              : visibleTaskList === "TaskAssignBy"
              ? "Tasks Assign By You"
              : visibleTaskList === "Cancelled"
              ? "Expired Tasks"
              : visibleTaskList === "In Progress"
              ? "In Progress Tasks"
              : visibleTaskList === "Employees"
              ? "Total Employees"
              : visibleTaskList === "Companies"
              ? "Total Companies"
              : visibleTaskList === "Meetings"
              ? "Total Meetings"
               : visibleTaskList === "UpcomingMeetings"
              ? "Upcoming Meetings"
              : ""}
          </Typography>
          <div id="task-list-modal-description">
            {visibleTaskList === "total" &&
              renderTaskTitles(totalTasks, [], [])}
            {visibleTaskList === "Completed" &&
              renderTaskTitles(completedTasks, [], [])}
            {visibleTaskList === "Pending" &&
              renderTaskTitles(pendingTasks, [], [])}
            {visibleTaskList === "TaskAssignBy" &&
              renderTaskTitles(TaskAssign, [], [])}
            {visibleTaskList === "Cancelled" &&
              renderTaskTitles(expiredTasks, [], [])}
            {visibleTaskList === "In Progress" &&
              renderTaskTitles(InProgressTasks, [], [])}
            {visibleTaskList === "Employees" &&
              renderTaskTitles([], totalEmployees, [])}
            {visibleTaskList === "Companies" &&
              renderTaskTitles([], [], totalCompanies)}
            {visibleTaskList === "Meetings" &&
              renderTaskTitles([], [], totalMeetings)}
            {visibleTaskList === "UpcomingMeetings" &&
              renderTaskTitles([], [], upcomingMeetings)}
          </div>
          <Button
            onClick={closeModal}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AdminPannelGrid;
{
}
