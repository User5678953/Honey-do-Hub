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
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description })
        await newTask.save()
        console.log('Creating a new task!')
        res.redirect('/tasks')
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('An error occurred while creating the task.')
    }   
}  
    
// GET - READ specific task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            res.status(404).send('Task not found')
        } else {
            console.log(`Displaying task with ID: ${req.params.id}`)
            res.render('show')
        }
    } catch {
        console.error('Error Fetching task:', error)
        res.status(500).send('An error occurred while fetching the task.')
    }
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
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedTask) {
            res.status(404).send('Task not found')
        } else {
            console.log(`Updating task with ID: ${req.params.id}`)
            res.redirect(`/tasks/${req.params.id}`)
        }
    } catch {
        console.error('Error updating task:', error)
        res.status(500).send('An error occurred while updating the task.')
    }
}

// DELETE a task by ID 
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndRemove(req.params.id)
        if (!deletedTask) {
            res.status(404).send('Task not found')
        } else {
            console.log(`Deleteing task with ID: ${req.params.id}`)
            res.redirect('/tasks')
        }
    } catch {
        console.error('Error deleting task:', error)
        res.status(500).send('An error occurred while deleting the task.')
    }    
}
