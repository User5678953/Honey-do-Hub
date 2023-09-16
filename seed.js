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
        "description": "SEED TASK: Purchase items for the week",
        "status": "to-do",
        "dueDate": "2023-09-23",
        "userId": "shared"
    },
    {
        "title": "Clean the living room",
        "description": "SEED TASK: Dust and vacuum the living room",
        "status": "in-progress",
        "dueDate": "2023-09-22",
        "userId": "shared"
    },
    {
        "title": "Pay bills",
        "description": "SEED TASK: Pay utility bills and rent",
        "status": "to-do",
        "dueDate": "2023-09-24",
        "userId": "shared"
    },
    {
        "title": "Fix leaking faucet",
        "description": "SEED TASK: Call a plumber to fix the kitchen faucet",
        "status": "in-progress",
        "dueDate": "2023-09-21",
        "userId": "shared"
    },
    {
        "title": "Mow the lawn",
        "description": "SEED TASK: Trim the grass in the backyard",
        "status": "to-do",
        "dueDate": "2023-09-22",
        "userId": "shared"
    },
    {
        "title": "Prepare dinner",
        "description": "SEED TASK: Cook a special meal for tonight",
        "status": "in-progress",
        "dueDate": "2023-09-19",
        "userId": "shared"
    },
    {
        "title": "Buy birthday gift",
        "description": "SEED TASK: Find a birthday gift for a friend",
        "status": "completed",
        "dueDate": "2023-09-29",
        "userId": "shared"
    },
    {
        "title": "Go for a run",
        "description": "SEED TASK: Run for 30 minutes in the evening",
        "status": "to-do",
        "dueDate": "2023-09-24",
        "userId": "shared"
    },
    {
        "title": "Read a book",
        "description": "SEED TASK: Read the latest novel for 30 minutes",
        "status": "completed",
        "dueDate": "2023-09-27",
        "userId": "shared"
    },
    {
        "title": "Organize the garage",
        "description": "SEED TASK: Clean and organize the garage space",
        "status": "completed",
        "dueDate": "2023-09-26",
        "userId": "shared"
        },
     {
        "title": "Schedule gym sessions",
        "description": "SEED TASK: Plan and schedule gym sessions for the upcoming weeks.",
        "status": "to-do",
        "dueDate": "2023-09-16",
        "userId": "shared"
    },
    {
        "title": "Plan weekend trip",
        "description": "SEED TASK: Plan a weekend getaway, including hotel booking and itinerary.",
        "status": "in-progress",
        "dueDate": "2023-09-27",
        "userId": "shared"
    },
    {
        "title": "Attend online seminar",
        "description": "SEED TASK: Register and attend an online seminar related to web development.",
        "status": "to-do",
        "dueDate": "2023-09-23",
        "userId": "shared"
    },
    {
        "title": "Complete book review",
        "description": "SEED TASK: Write and submit a book review for the recently read novel.",
        "status": "completed",
        "dueDate": "2023-09-29",
        "userId": "shared"
    },
    {
        "title": "Donate old clothes",
        "description": "SEED TASK: Sort out and donate clothes that are no longer needed to a local charity.",
        "status": "completed",
        "dueDate": "2023-09-25",
        "userId": "shared"
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
