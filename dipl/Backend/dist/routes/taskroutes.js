"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../../middleware'),
  authenticateToken = _require.authenticateToken;
var _require2 = require('../controllers/taskcontroller'),
  getAllTasks = _require2.getAllTasks,
  getTaskById = _require2.getTaskById,
  createTask = _require2.createTask,
  updateTask = _require2.updateTask,
  deleteTask = _require2.deleteTask,
  scheduleTask = _require2.scheduleTask,
  rescheduleTask = _require2.rescheduleTask,
  getTaskHistory = _require2.getTaskHistory;

// Apply authenticateToken middleware to all task routes
router.use(authenticateToken);

// Get all tasks (requires authentication)
router.get('/', authenticateToken, getAllTasks);

// Get particular task by ID (requires authentication)
router.get('/:id', authenticateToken, getTaskById);

// Create a new task (requires authentication)
router.post('/', createTask);

// Update a task (requires authentication)
router.put('/:id', updateTask);

// Delete a task (requires authentication)
router["delete"]('/:id', deleteTask);

// Schedule a task (requires authentication)
router.put('/:id/schedule', scheduleTask);

// Reschedule a task (requires authentication)
router.put('/:id/reschedule', rescheduleTask);

// Get task history (requires authentication)
router.get('/:id/history', getTaskHistory);
module.exports = router;