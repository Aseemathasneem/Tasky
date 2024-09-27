// routes/taskRoutes.js
const express = require('express');

const verifyToken = require('../middleware/authMiddleware.js');
const { getTasks, addTask, deleteTask, updateTask, taskStats } = require('../controllers/taskController.js');

const router = express.Router();

// Protected routes - users must be authenticated (JWT)
router.get('/tasks', verifyToken,verifyToken, getTasks);
router.post('/tasks', verifyToken, addTask);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);
router.get('/tasks/stats', verifyToken,taskStats);


module.exports = router;
