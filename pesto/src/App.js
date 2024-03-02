import React, { useState, useEffect } from 'react';
import TaskForm from '../src/component/TaskForm'; // Adjust the import path as needed
import TaskList from '../src/component/TaskList';
import TaskService from '../src/services/TaskService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this line is included

const App = () => {
 const [tasks, setTasks] = useState([]);
 const [filter, setFilter] = useState('All');

 useEffect(() => {
    TaskService.getAllTasks()
      .then(setTasks)
      .catch((error) => console.error('Error fetching tasks:', error));
 }, []);

 const addTask = async (newTask) => {
    try {
      const addedTask = await TaskService.addTask(newTask);
      setTasks(prevTasks => [...prevTasks, addedTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
 };

 const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const updatedTask = await TaskService.updateTaskStatus(taskId, newStatus);
      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
 };

 const deleteTask = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
 };

 const filteredTasks = filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);

 return (
    <div className="container">
      <h1 className="text-center my-4">Task Management Application</h1>
      <TaskForm onSubmit={addTask} />
      <div className="d-flex justify-content-center mb-4">
        <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <TaskList tasks={filteredTasks} onUpdateStatus={updateTaskStatus} onDelete={deleteTask} />
    </div>
 );
};

export default App;
