//import Task, { findById, find, findByIdAndUpdate, deleteOne } from '../models/TaskModels.js';
import Task from '../models/TaskModels.js';
import User from '../models/UsersModels.js';
import Notification from '../models/notificationmodal.js';


// Create a new task
export async function createTask(req, res) {
  try {
    const { title, description, assignedTo, status, DueDate} = req.body;
    const createdBy = req.user.id;
    const assignDate = new Date();
    

    const newTask = new Task({
      title,
      description,
      assignedTo,
      assignDate,
      DueDate,
      createdBy,
      status,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Get Particular task
export async function getTaskById(req, res) {
  try {
    console.log("in task id");
    const taskId = req.params.id;
    const authenticatedUserId = req.user.id;
    const isAdmin = req.user.isAdmin;

    // Find the task by ID
    const task = await Task.findById(taskId);

    // If the task is not found, return a 404 error
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if the authenticated user is trying to access their own data or if they are an admin
    if (task.userId !== authenticatedUserId && !isAdmin) {
      return res.status(403).json({ msg: 'Access denied. You can only view your own Tasks.' });
    }

    // Return the task
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Get all tasks
export async function getAllTasks(req, res) {
  try {
    const authenticatedUserId = req.user.id;
    const isAdmin = req.user.isAdmin;

    let tasks;

    // If the user is an admin, fetch all tasks
    if (isAdmin) {
      tasks = await Task.find()
        .populate('assignedTo', 'name')
        .populate('createdBy', 'name')
        .populate({
          path: 'history.user',
          select: 'name',
        });
    } else {
      // If the user is not an admin, fetch only the tasks assigned to them
      tasks = await Task.find({
        $or: [
            { assignedTo: authenticatedUserId },
            { createdBy: authenticatedUserId }
        ]
      })
        .populate('assignedTo', 'name')
        .populate('createdBy', 'name')
        .populate({
          path: 'history.user',
          select: 'name',
        });
    }

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Update a task
export async function updateTask(req, res) {
  try {
    const { title, description, status, assignDate, DueDate, assignedTo } = req.body;
    const taskId = req.params.id;
    const currentUser = req.user;

    // Find the task
    const task = await Task.findById(taskId);

    // If the task is not found, return a 404 error
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    let updatedFields = {};

    if (currentUser.isAdmin) {
      // Admins can update all fields
      updatedFields = { title, description, status, assignDate, DueDate, assignedTo };
    } else if ((task.createdBy.toString() === currentUser.id)){
      // Regular users who assigned the task can update limited fields
      updatedFields = { title, description, DueDate,status };

    } else if ((task.assignedTo.toString() === currentUser.id)){

      if (['In Progress', 'Done', 'Pending'].includes(status)) {
        updatedFields = { status };
      } else {
        return res.status(403).json({ msg: 'Access denied. You can only update the status to "In-Progress" or "Done".', color: 'red' });
      }
    } else {
      return res.status(403).json({ msg: 'Access denied. You do not have permission to update this task.', color: 'red' });
    }

    // Check if the task is overdue
    const currentDate = new Date();
    if (new Date(task.DueDate) < currentDate && task.status !== 'Done' && 'Completed') {
      updatedFields.status = 'Cancelled';
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updatedFields,
      { new: true }
    );

    // Return the updated task
    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Schedule a task
export async function scheduleTask(req, res) {
  try {
    const taskId = req.params.id;
    const { scheduledDate } = req.body;

    // Find the task by ID
    const task = await Task.findById(taskId);

    // If the task is not found, return a 404 error
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Update the scheduledDate and history
    task.scheduledDate = scheduledDate;
    task.scheduledStatus = 'Scheduled';
    task.history.push({
      eventType: 'Scheduled',
      eventDate: new Date(),
      user: req.user.id, // assuming req.user.id contains the ID of the user performing the action
      remarks: `Scheduled for ${scheduledDate}`,
    });

    // Save the updated task
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Reschedule a task
export const rescheduleTask = async (req, res) => {
  try {
    //console.log("user",req.user);
    const { DueDate, remarks } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.DueDate = DueDate;
    task.status = 'Pending';
    task.rescheduleRequested = false;
    task.history.push({
      eventType: 'Rescheduled',
      eventDate: new Date(),
      user: req.user.id, // Assuming you have user info in the request
      remarks: `Scheduled for ${DueDate}`, remarks
    });
    await task.save();

    // Remove the notification
    await Notification.deleteOne({ task: task._id, type: 'reschedule_request' });

    res.status(200).json({ message: 'Task rescheduled successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error rescheduling task', error: error.message });
  }
};

// Get task history
export async function getTaskHistory(req, res) {
  try {
    const taskId = req.params.id;

    // Find the task by ID
    const task = await Task.findById(taskId).populate('history.user', 'name');

    // If the task is not found, return a 404 error
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.json(task.history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Delete a task
export async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const isAdmin = req.user.isAdmin;

    // Check if the authenticated user is an admin
    if (!isAdmin) {
      return res.status(403).json({ msg: 'Access denied. Only admins can delete tasks.', color: 'red' });
    }

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Delete the task
    await Task.deleteOne({ _id: taskId });

    res.json({ msg: 'Task Successfully deleted',color: 'green' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}


export async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find({ recipient: req.user.id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};


//Request-Reschedule
export const RequestReschedule = async (req, res) => {
  try {
    //console.log("in Request",req.params);
    const task = await Task.findById(req.params.taskId);
    //console.log(task);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.rescheduleRequested = true;
    await task.save();

    // Create a notification for the task creator
    const notification = new Notification({
      type: 'reschedule_request',
      message: `Reschedule requested for task: ${task.title}`,
      task: task._id,
      recipient: task.createdBy  // Set the recipient to the task creator
    });
    await notification.save();

    res.status(200).json({ message: 'Reschedule request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting reschedule', error: error.message });
  }
};

export const RejectRequest = async (req, res) => {
  try {
    //console.log("in reject", req.params);
    const task = await Task.findById(req.params.taskId);
    //console.log("Task response",task);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.rescheduleRequested = false;
    await task.save();

    // Remove the notification
    await Notification.deleteOne({ task: task._id, type: 'reschedule_request' });

    res.status(200).json({ message: 'Reschedule request rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting reschedule request', error: error.message });
  }
};




