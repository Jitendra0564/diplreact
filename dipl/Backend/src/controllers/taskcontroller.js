const Task = require('../models/TaskModels');


// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo,status} = req.body;
    const createdBy = req.user.id;
    const assignDate = new Date();
    const DueDate = new Date();

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
};

// Get Particular task
exports.getTaskById = async (req, res) => {
  try {
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
};


// Get all tasks
exports.getAllTasks = async (req, res) => {
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
      tasks = await Task.find({ assignedTo: authenticatedUserId })
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
};


// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, assignDate, dueDate, assignedTo } = req.body;
    const taskId = req.params.id;
    const isAdmin = req.user.isAdmin;

    // Check if the authenticated user is an admin
    if (!isAdmin) {
      return res.status(403).json({ msg: 'Access denied. Only admins can update tasks.', color: 'red' });

    }

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, assignDate, dueDate, assignedTo },
      { new: true }
    );

    // If the task is not found, return a 404 error
    if (!updatedTask) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Return the updated task
    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Schedule a task
exports.scheduleTask = async (req, res) => {
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
};

// Reschedule a task
exports.rescheduleTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { rescheduledDate, remarks } = req.body; // Ensure the field name is `rescheduledDate` instead of `eventDate`

    // Find the task by ID
    const task = await Task.findById(taskId);

    // If the task is not found, return a 404 error
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Update the rescheduledDate and history
    task.rescheduledDate = rescheduledDate;
    task.scheduledStatus = 'Rescheduled';
    task.history.push({
      eventType: 'Rescheduled',
      eventDate: new Date(),
      user: req.user.id,
      remarks: `Rescheduled for ${rescheduledDate}, Remarks: ${remarks}`,
    });

    // Save the updated task
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Get task history
exports.getTaskHistory = async (req, res) => {
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
};

// Delete a task
exports.deleteTask = async (req, res) => {
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

    res.json({ msg: 'Task deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};




