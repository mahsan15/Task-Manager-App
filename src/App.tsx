// App.tsx

import React, { useState, useEffect } from 'react';
import './App.css'; // You can import your CSS file here
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter'; // Import your categories array

import { Task } from './Task';

// Define your initial categories array
const initialCategories = ['Work', 'Personal', 'School'];


const App: React.FC = () => {
  // Initialize tasks state with data retrieved from local storage, if available
  const initialTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(initialTasks);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Function to add a task
  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const taskId = tasks.length + 1; // Generate a unique id
    const dueDate = new Date(newTask.dueDate);
    dueDate.setHours(24); // Adjust dueDate to start of day in the local time zone
    const taskToAdd: Task = { ...newTask, id: taskId, dueDate };
    const updatedTasks = [...tasks, taskToAdd];
    setTasks(updatedTasks);
    updateFilteredTasks(updatedTasks, selectedCategory);


  };

  // Function to delete a task by ID
  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    updateFilteredTasks(updatedTasks, selectedCategory);
  };

  // Function to handle category filter selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    updateFilteredTasks(tasks, category);
  };

  // Function to update filtered tasks based on the selected category
  const updateFilteredTasks = (tasksToFilter: Task[], categoryToFilter: string) => {
    if (categoryToFilter === '') {
      setFilteredTasks(tasksToFilter);
    } else {
      const filtered = tasksToFilter.filter((task) => task.category === categoryToFilter);
      setFilteredTasks(filtered);
    }
  };

  // Store tasks in local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      <h1>Task Management App</h1>
      <TaskForm onSubmit={handleAddTask} categories={initialCategories} />
      <TaskFilter onSelectCategory={handleCategorySelect} cat={initialCategories} />
      <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} />

    </div>
  );
};

export default App;
