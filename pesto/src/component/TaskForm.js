import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do'); // Default status is 'Pending'

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill out all fields');
      return;
    }
    // Call the onSubmit function with the new task object
    onSubmit({ title, description, status });
    // Reset form fields
    setTitle('');
    setDescription('');
    setStatus('To Do');
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
