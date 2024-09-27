const Task = require('../models/taskModel');
const mongoose = require('mongoose'); 
const { emitTaskUpdate } = require('../socket'); 

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
  try {
    const userId = req.user; 
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Create a new task with the user ID from req.user
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user // Associate the task with the authenticated user
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    // Emit real-time event to all connected clients
    emitTaskUpdate(savedTask);

    // Respond with the saved task
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Server error, task could not be added' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    // Find the task by ID and ensure it belongs to the authenticated user
    const task = await Task.findOneAndDelete({ _id: taskId, user: req.user });

    // If task not found or doesn't belong to the user, return an error
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    // Emit real-time event to notify clients of the deletion
    emitTaskUpdate({ _id: taskId, deleted: true });

    // Return success response
    res.status(200).json({ message: 'Task deleted successfully', task });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error, could not delete task' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params; 
  const { title, description, priority, status, dueDate } = req.body; 

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priority, status, dueDate },
      { new: true, runValidators: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' }); 
    }

    // Emit real-time event to notify clients of the task update
    emitTaskUpdate(updatedTask);

    res.status(200).json(updatedTask); 
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message }); 
  }
};

const taskStats = async (req, res) => {
  try {
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const pendingTasks = await Task.countDocuments({ status: 'pending' });
    const inProgressTasks = await Task.countDocuments({ status: 'in-progress' });

    // Optionally, calculate overdue tasks (e.g., based on dueDate)
    const currentDate = new Date();
    const overdueTasks = await Task.countDocuments({ dueDate: { $lt: currentDate }, status: 'pending' });

    res.json({
      completed: completedTasks,
      pending: pendingTasks,
      inProgress: inProgressTasks,
      overdue: overdueTasks
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving task statistics', error });
  }
};

module.exports = { getTasks, addTask, deleteTask, updateTask,taskStats };
