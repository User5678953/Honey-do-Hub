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
        "status": "to-do",
        "dueDate": "2023-09-23"
    },
    {
        "title": "Clean the living room",
        "description": "Dust and vacuum the living room",
        "status": "in-progress",
        "dueDate": "2023-09-22"
    },
    {
        "title": "Pay bills",
        "description": "Pay utility bills and rent",
        "status": "to-do",
        "dueDate": "2023-09-24"
    },
    {
        "title": "Fix leaking faucet",
        "description": "Call a plumber to fix the kitchen faucet",
        "status": "in-progress",
        "dueDate": "2023-09-21"
    },
    {
        "title": "Mow the lawn",
        "description": "Trim the grass in the backyard",
        "status": "to-do",
        "dueDate": "2023-09-22"
    },
    {
        "title": "Prepare dinner",
        "description": "Cook a special meal for tonight",
        "status": "in-progress",
        "dueDate": "2023-09-19"
    },
    {
        "title": "Buy birthday gift",
        "description": "Find a birthday gift for a friend",
        "status": "completed",
        "dueDate": "2023-09-29"
    },
    {
        "title": "Go for a run",
        "description": "Run for 30 minutes in the evening",
        "status": "to-do",
        "dueDate": "2023-09-24"
    },
    {
        "title": "Read a book",
        "description": "Read the latest novel for 30 minutes",
        "status": "completed",
        "dueDate": "2023-09-27"
    },
    {
        "title": "Organize the garage",
        "description": "Clean and organize the garage space",
        "status": "completed",
        "dueDate": "2023-09-26"
        },
     {
        "title": "Schedule gym sessions",
        "description": "Plan and schedule gym sessions for the upcoming weeks.",
        "status": "to-do",
        "dueDate": "2023-09-16"
    },
    {
        "title": "Plan weekend trip",
        "description": "Plan a weekend getaway, including hotel booking and itinerary.",
        "status": "in-progress",
        "dueDate": "2023-09-27"
    },
    {
        "title": "Attend online seminar",
        "description": "Register and attend an online seminar related to web development.",
        "status": "to-do",
        "dueDate": "2023-09-23"
    },
    {
        "title": "Complete book review",
        "description": "Write and submit a book review for the recently read novel.",
        "status": "completed",
        "dueDate": "2023-09-29"
    },
    {
        "title": "Donate old clothes",
        "description": "Sort out and donate clothes that are no longer needed to a local charity.",
        "status": "completed",
        "dueDate": "2023-09-25"
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
