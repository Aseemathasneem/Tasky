// controllers/taskController.js
const Task = require('../models/taskModel');

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new task
exports.addTask = async (req, res) => {
  const { title, description, status,priority, dueDate } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Other task CRUD operations (update, delete) would go here...
