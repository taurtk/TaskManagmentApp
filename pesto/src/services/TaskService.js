import { v4 as uuidv4 } from 'uuid';

const TASKS_API_URL = 'http://localhost:8000/tasks';

const TaskService = {
 getAllTasks: async () => {
    try {
      const response = await fetch(TASKS_API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching tasks');
    }
 },

 addTask: async (newTask) => {
    try {
      // Generate a new UUID for the task
      const taskWithUUID = { ...newTask, id: uuidv4() };

      const response = await fetch(TASKS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskWithUUID),
      });
      const addedTask = await response.json();
      return addedTask;
    } catch (error) {
      throw new Error('Error adding task');
    }
 },

 updateTaskStatus: async (taskId, newStatus) => {
    try {
      const response = await fetch(`${TASKS_API_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedTask = await response.json();
      return updatedTask;
    } catch (error) {
      throw new Error('Error updating task status');
    }
 },

 deleteTask: async (taskId) => {
    try {
      await fetch(`${TASKS_API_URL}/${taskId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error('Error deleting task');
    }
 },
};

export default TaskService;
