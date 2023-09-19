// Require mongoose
const mongoose = require('mongoose')

// Require model
const Task = require('../models/taskModels')

// GET - READ all tasks
exports.getAllTasks = async (req, res) => {
    console.log('Displaying all Tasks')
    // Fetch from db
    try {
        const tasks = await Task.find({
            $or: [
                { userId: req.session.currentUser._id },
                { userId: "shared" }
            ]
        })
        
        const formattedTasks = tasks.map(task => {
            task = task.toObject(); 
            task.dueDate = formatDate(task.dueDate);
            return task;
        })

        res.render('index', { tasks: formattedTasks });
    } catch (error) {
        console.error('Error Fetching tasks:', error);
    }
}
// format date time 
function formatDate(dateObj) {
     if (!dateObj) {
        return "N/A"
     }
    
    const options = { weekday: 'short', month: 'short', day: 'numeric' }
    return dateObj.toLocaleDateString('en-US', options)
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
        const newTask = new Task({ title, description, userId: req.session.currentUser._id  })
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
        const task = await Task.findOne({ 
            _id: req.params.id,
            $or: [
                { userId: req.session.currentUser._id },
                { userId: "shared" }
            ]
        })
        
        if (!task) {
            res.status(404).send('Task not found')
        } else {
            console.log(`Displaying task with ID: ${req.params.id}`)
            res.render('show',{ task })
        }
    } catch (error) {
        console.error('Error Fetching task:', error)
        res.status(500).send('An error occurred while fetching the task.')
    }
}

// GET - READ form to EDIT task by ID
exports.editTaskForm = async (req, res) => {
     try {
         const task = await Task.findOne({
            _id: req.params.id,
            $or: [
                { userId: req.session.currentUser._id },
                { userId: "shared" }
            ]
        })
         console.log(`Displaying form to edit task with ID: ${req.params.id}`)
         if (!task) {
             res.status(404).send('Task not found')
            } else {
                res.render('edit', { task: task })
            }   
    } catch (error) {
         console.error('Error Fetching task for editing:', error)
         res.status(500).send('An error occurred while fetching the task for editing.')
    }
}

// PUT - Update a task by ID
exports.updateTask = async (req, res) => {
     console.log('Starting the UPDATE Function')
    try {
        const updatedTask = await Task.findOneAndUpdate({
            _id: req.params.id,
            $or: [
                { userId: req.session.currentUser._id },
                { userId: "shared" }
            ]
        }, req.body)
        
        if (!updatedTask) {
            res.status(404).send('Task not found')
        } else {
            console.log(`Updating task with ID: ${req.params.id}`)
            res.redirect('/tasks')
        }
    } catch (error) {
        console.error('Error updating task:', error)
        res.status(500).send('An error occurred while updating the task.')
    }
}

// DELETE a task by ID 
exports.deleteTask = async (req, res) => {
    console.log(`Attempting to delete task with ID: ${req.params.id}`)

    try {
        const deletedTask = await Task.findOneAndRemove({
            _id: req.params.id,
            $or: [
                { userId: req.session.currentUser._id },
                { userId: "shared" }
            ]
        })
        if (!deletedTask) {
            res.status(404).send('Task not found')
        } else {
            console.log(`Deleteing task with ID: ${req.params.id}`)
            res.redirect('/tasks')
        }
    } catch (error) {
        console.error('Error deleting task:', error)
        res.status(500).send('An error occurred while deleting the task.')
    }    
}
