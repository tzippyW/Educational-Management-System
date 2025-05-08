import React from 'react';
import AddTask from '../features/tasks/AddTask';
import EditTaskForm from '../features/tasks/EditTaskForm';
import FilterBar from '../features/tasks/FilterBar';
import TaskList from '../features/tasks/TaskList';

const Tasks = () => {
  return (
    <div>
      <h1>Todos</h1>
        <AddTask />
        <FilterBar />
        <TaskList />
    </div>
  );
};

export default Tasks;