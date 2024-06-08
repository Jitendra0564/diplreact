const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../middleware');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  scheduleTask,
  rescheduleTask,
  getTaskHistory,

} = require('../controllers/taskcontroller');

// Apply authenticateToken middleware to all task routes
router.use(authenticateToken);

// Get all tasks (requires authentication)
router.get('/',authenticateToken, getAllTasks);

// Get particular task by ID (requires authentication)
router.get('/:id',authenticateToken, getTaskById);

// Create a new task (requires authentication)
router.post('/', createTask);

// Update a task (requires authentication)
router.put('/:id', updateTask);

// Delete a task (requires authentication)
router.delete('/:id', deleteTask);

// Schedule a task (requires authentication)
router.put('/:id/schedule', scheduleTask);

// Reschedule a task (requires authentication)
router.put('/:id/reschedule', rescheduleTask);

// Get task history (requires authentication)
router.get('/:id/history', getTaskHistory);

module.exports = router;
