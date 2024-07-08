import { Router } from 'express';
const router = Router();
import { authenticateToken } from '../middleware.js';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask, scheduleTask, rescheduleTask, getTaskHistory, RequestReschedule,
    RejectRequest,getNotifications } from '../controllers/taskcontroller.js';

// Apply authenticateToken middleware to all task routes
//router.use(authenticateToken);

// Get all tasks (requires authentication)
router.get('/',authenticateToken, getAllTasks);

// Get Notifications
router.get('/notifications', authenticateToken, getNotifications);

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

// Request reschedule
router.post('/:taskId/request-reschedule',RequestReschedule);

// Reject reschedule request
router.post('/:taskId/reject-reschedule',RejectRequest);



export default router;
