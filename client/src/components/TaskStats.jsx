import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import api from '../utils/axios';

// Register the chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStats = () => {
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    inProgress: 0,
    overdue: 0
  });

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const response = await api.get('/tasks/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching task stats:', error);
      }
    };

    fetchTaskStats();
  }, []);

  const data = {
    labels: ['Completed', 'Pending', 'In Progress', 'Overdue'],
    datasets: [
      {
        label: 'Tasks',
        data: [stats.completed, stats.pending, stats.inProgress, stats.overdue],
        backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#f44336'], // Colors for the pie chart sections
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="task-stats-chart">
      <h2 className="text-xl font-bold mb-4">Task Statistics</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default TaskStats;
