const express = require('express');
const { getTasks, createTask, getTaskById, updateTask, changeTaskStatus, deleteTask, getUserTasks } = require('../controllers/taskController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.patch('/:id', changeTaskStatus);
router.delete('/:id', deleteTask);
router.get('/users/:id/tasks', getUserTasks);

module.exports = router;