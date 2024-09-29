
const express = require('express');

const {verifyToken} = require('../middleware/authMiddleware.js');
const { getTasks, addTask, deleteTask, updateTask, taskStats } = require('../controllers/taskController.js');

const router = express.Router();

router.use(verifyToken)

router.get('/tasks', getTasks);
router.post('/tasks', addTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/stats',taskStats);


module.exports = router;
