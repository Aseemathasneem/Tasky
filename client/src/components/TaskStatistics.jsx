import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';

const TaskStatistics = ({ tasks }) => {
  // Task completion data (example)
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  // Task category data
  const taskCategories = tasks.reduce((acc, task) => {
    acc[task.category] = acc[task.category] ? acc[task.category] + 1 : 1;
    return acc;
  }, {});

  // Task completion trend over time
  const dailyTaskCompletion = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [5, 6, 4, 8, 3],
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Task Statistics</h2>

      <div className="mb-6">
        <h3 className="text-xl mb-2">Task Completion Overview</h3>
        <Pie
          data={{
            labels: ['Completed Tasks', 'Pending Tasks'],
            datasets: [
              {
                data: [completedTasks, pendingTasks],
                backgroundColor: ['#4caf50', '#ff9800'],
                hoverBackgroundColor: ['#66bb6a', '#ffa726'],
              },
            ],
          }}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-xl mb-2">Tasks by Category</h3>
        <Bar
          data={{
            labels: Object.keys(taskCategories),
            datasets: [
              {
                label: 'Number of Tasks',
                data: Object.values(taskCategories),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
              },
            ],
          }}
        />
      </div>

      <div>
        <h3 className="text-xl mb-2">Task Completion Trend</h3>
        <Line data={dailyTaskCompletion} />
      </div>
    </div>
  );
};

export default TaskStatistics;
