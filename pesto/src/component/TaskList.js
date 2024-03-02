import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateStatus, onDelete }) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
