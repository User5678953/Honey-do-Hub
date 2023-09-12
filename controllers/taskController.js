// Require mongoose
const mongoose = require('mongoose')

// Require model
const Task = require('../models/taskModels')

// GET - READ all tasks
exports.getAllTasks = async (req, res) => {
    console.log('Displaying all Tasks')
    // Fetch from db
    try {
        const tasks = await Task.find()
        res.render('index', { tasks })
    } catch (error) {
        console.error('Error Fetching tasks:', error)
    }
}


// GET - READ form to CREATE a new task 
exports.newTaskForm = (req, res) => {
    console.log('Displaying new.ejs')
    res.render('new')
}

// POST - CREATE a new task
exports.createTask = (req, res) => {
    console.log('Creating a new task!')
    //res.redirect
}  
    
// GET - READ specific task by ID
exports.getTaskById = (req, res) => {
    console.log(`Displaying task with ID: ${req.params / id}`)
    res.render('show')
}

// GET - READ form to EDIT task by ID
exports.editTaskForm = async (req, res) => {
     try {
        const task = await Task.find()
        console.log(`Displaying form to edit task with ID: ${req.params.id}`)
        res.render('edit', { task })
    } catch (error) {
         console.error('Error Fetching task for editing:', error)
    }
}

// PUT - Update a task by ID
exports.updateTask = (req, res) => {
    console.log(`Updating task with ID: ${req.params.id}`)
}

// DELETE a task by ID 
exports.deleteTask = (req, res) => {
    console.log(`Deleteing task with ID: ${req.params.id}`)
}
