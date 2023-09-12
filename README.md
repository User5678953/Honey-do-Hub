# Honey Do Hub - Task Sharing App

Honey Do Hub is a web-based task-sharing application designed to help busy couples and households manage their to-do lists collaboratively. It allows users to create, assign, and track tasks, making it easier to stay organized and divide responsibilities.

## MVP Features

- **Task Management**: Create, view, edit, and delete tasks. Assign tasks to specific users within the household.

- **Task Status Tracking**: Keep track of task statuses (e.g., to-do, in progress, completed) for efficient task management.

- **User Profiles**: Users can customize their profiles with names, profile pictures, and other personal information.

## Stretch Goals

- **User Authentication**: Secure user accounts with registration and login functionality using bcrypt for password encryption.

## Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript
  - EJS (Embedded JavaScript) for dynamic templating
  - Bootstrap for responsive design

- **Backend**:
  - Node.js
  - Express.js for building the server
  - MongoDB as the database using Mongoose for modeling
  - RESTful API for handling CRUD operations
  - Bcrypt for password hashing and user authentication

- **Deployment**:
  - Hosted on Heroku
  - MongoDB Atlas for cloud-based database hosting

## Getting Started

1. Clone this repository to your local machine:

   git clone https://github.com/yourusername/honey-do-hub.git

2. Then seed the DB, In the terminal run

  node seed.js

  you will see 'Database seeded Successfully'

3. Then start the application 

  node server.js 

   
