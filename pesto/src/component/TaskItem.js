import React from 'react';

const TaskItem = ({ task, onUpdateStatus, onDelete }) => {
  const { id, title, description, status } = task;

  const handleStatusUpdate = () => {
    // Example: updating status to 'Completed'
    onUpdateStatus(id, 'Completed');
  };

  const handleDeleteTask = () => {
    onDelete(id);
  };

  return (
    <div className="task-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Status: {status}</p>
      <button onClick={handleStatusUpdate}>Update Status</button>
      <button onClick={handleDeleteTask}>Delete</button>
    </div>
  );
};

export default TaskItem;
