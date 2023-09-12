const mongoose = require('mongoose')
const Task = require('./models/taskModels')
const mongoURI = "mongodb+srv://kendynweb:JO754cohXHdsjbD0@mymongodb.drbvgwr.mongodb.net/?retryWrites=true&w=majority"

const db = mongoose.connection 

// connect to the database 
mongoose.connect(mongoURI)

// Event listener for successful database connection
db.once('open', async () => {
    console.log('Connected to MongoDB')


console.log('Starting the Seed script')

    const seedData =[
    {
        "title": "Buy groceries",
        "description": "Purchase items for the week",
        "status": "to-do"
    },
    {
        "title": "Clean the living room",
        "description": "Dust and vacuum the living room",
        "status": "in-progress"
    },
    {
        "title": "Pay bills",
        "description": "Pay utility bills and rent",
        "status": "to-do"
    },
    {
        "title": "Fix leaking faucet",
        "description": "Call a plumber to fix the kitchen faucet",
        "status": "in-progress"
    },
    {
        "title": "Mow the lawn",
        "description": "Trim the grass in the backyard",
        "status": "to-do"
    },
    {
        "title": "Prepare dinner",
        "description": "Cook a special meal for tonight",
        "status": "in-progress"
    },
    {
        "title": "Buy birthday gift",
        "description": "Find a birthday gift for a friend",
        "status": "completed"
    },
    {
        "title": "Go for a run",
        "description": "Run for 30 minutes in the evening",
        "status": "to-do"
    },
    {
        "title": "Read a book",
        "description": "Read the latest novel for 30 minutes",
        "status": "completed"
    },
    {
        "title": "Organize the garage",
        "description": "Clean and organize the garage space",
        "status": "completed"
    },
    {
        "title": "Task 11",
        "description": "Description for Task 11",
        "status": "to-do"
    },
    {
        "title": "Task 12",
        "description": "Description for Task 12",
        "status": "in-progress"
    },
    {
        "title": "Task 13",
        "description": "Description for Task 13",
        "status": "to-do"
    },
    {
        "title": "Task 14",
        "description": "Description for Task 14",
        "status": "completed"
    },
    {
        "title": "Task 15",
        "description": "Description for Task 15",
        "status": "completed"
    } 
]
try {
        // Insert seed data into the database
    await Task.insertMany(seedData);
        console.log('Database seeded successfully!')
    } catch (error) {
        console.error('Error seeding database:', error)
    } finally {
        // Close the database connection
        mongoose.disconnect();
    }
})

// Event listener for database connection error
db.on('error', (error) => {
    console.error('MongoDB connection error:', error)
})
