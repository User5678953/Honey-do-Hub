const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')

console.log(taskController);


// Routes to controller 

// (index.ejs) HTTP GET request - READ all Tasks
router.get('/', taskController.getAllTasks)

// (new.ejs HTTP GET request - READ from to CREATE new task
router.get('/new', taskController.newTaskForm)

// (new.ejs) HTTP POST request - CREATE a new task
router.post('/', taskController.createTask)

// (show.ejs) HTTP GET request - READ single task by ID
router.get('/:id', taskController.getTaskById)

// (edit.ejs) HTTP POST request - CREATE a new task
router.get('/:id/edit', taskController.editTaskForm)

// HTTP PUT request - UPDATE a specific task by ID
router.put('/:id', taskController.updateTask)

// HTTP DELETE request - DELETE a specific task by ID
router.delete('/:id', taskController.deleteTask)


module.exports = router