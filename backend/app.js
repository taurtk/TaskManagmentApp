// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const { validateTaskCreation } = require('./validation');
const http = require('http'); // Import http module
const socketIo = require('socket.io'); // Import socket.io

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Attach Socket.IO to the server

const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample tasks data (temporary)
let tasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do' },
  { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress' },
  { id: 3, title: 'Task 3', description: 'Description 3', status: 'Done' }
];

// Route to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route to get a single task by its ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.filter(task => task.id == req.params.id);
  if (task.length > 0) {
     res.json(task[0]); // Return the first (and only) task that matches the ID
  } else {
     res.status(404).json({ error: 'Task not found' }); // If no task is found, return a 404 error
  }
 });
 
// Route to create a new task
app.post('/tasks', validateTaskCreation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newTask = req.body;
  tasks.push(newTask);

  // Emit an event to notify clients about the new task
  io.emit('newTask', newTask); // Broadcasting to all connected clients

  res.status(201).json(newTask);
});

// Assuming you have a function to validate task updates similar to your task creation validation
// validateTaskUpdate could be your validation middleware for updating tasks

app.put('/tasks/:id', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
  }
 
  const taskId = req.params.id;
  const updatedTask = req.body;
 
  // Find the task by ID
  const taskIndex = tasks.findIndex(task => task.id === taskId);
 
  if (taskIndex === -1) {
     // If the task is not found, return a 404 error
     return res.status(404).json({ error: 'Task not found' });
  }
 
  // Update the task with the new data from the request body
  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
 
  // Emit an event to notify clients about the updated task
  io.emit('taskUpdated', tasks[taskIndex]); // Assuming 'io' is your Socket.IO instance
 
  res.json(tasks[taskIndex]);
 });
 
// Assuming 'tasks' is an array that holds your tasks, and each task has a unique 'id'

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
 
  // Find the index of the task to be deleted
  const taskIndex = tasks.findIndex(task => task.id === taskId);
 
  if (taskIndex === -1) {
     // If the task is not found, return a 404 error
     return res.status(404).json({ error: 'Task not found' });
  }
 
  // Delete the task from the array
  tasks.splice(taskIndex, 1);
 
  // Optionally, emit an event to notify clients about the deletion
  // Assuming 'io' is your Socket.IO instance
  // io.emit('taskDeleted', taskId); // Broadcasting to all connected clients
 
  // Send a success response
  res.status(200).json({ message: 'Task deleted successfully', id: taskId });
 });
 
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});