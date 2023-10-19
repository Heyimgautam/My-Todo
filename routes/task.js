const express = require('express')
const isAuthenticated = require('../middleware/auth')
const {addTask,showTasks,updateTask,deleteTask} = require('../controllers/task')
const router = express.Router();

router.post('/newtask', isAuthenticated,addTask);
router.get('/getTask',isAuthenticated,showTasks);
router.route('/:id').put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);


module.exports = router;