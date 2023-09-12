// Require model
const Task = require('../models/taskModels')

// GET - READ all tasks
exports.getAllTasks = (req, res) => {
    res.send('Displaying all Tasks')
}

// GET - READ form to CREATE a new task 
exports.newTaskForm = (req, res) => {
    res.send('Displaying new.ejs')
}

// POST - CREATE a new task
exports.createTask = (req, res) => {
    res.send('Creating a new task!')
}  
    
// GET - READ specific task by ID
exports.getTaskById = (req, res) => {
    res.send(`Displaying task with ID: ${req.params/id}`)
}

// GET - READ form to EDIT task by ID
exports.editTaskForm = (req, res) => {
    res.send(`Displaying form to edit task with ID: ${req.params.id}`)
}

// PUT - Update a task by ID
exports.updateTask = (req, res) => {
    res.send(`Updating task with ID: ${req.params.id}`)
}

// DELETE a task by ID
exports.deleteTask = (req, res) => {
    res.send(`Deleteing task with ID: ${req.params.id}`)
}
