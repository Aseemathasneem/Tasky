import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskStatistics from '../components/TaskStatistics';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch task data from the backend (replace with actual API call)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://your-backend-api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      
      {/* Task Statistics Component */}
      <TaskStatistics tasks={tasks} />

      {/* Task List Component */}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Dashboard;
