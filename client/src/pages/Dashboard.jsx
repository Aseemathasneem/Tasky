import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { Modal } from 'flowbite-react';
import api from '../utils/axios';
import TaskEditForm from '../components/TaskEditForm'; 
import TaskStats from '../components/TaskStats';
import { io } from 'socket.io-client';  

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); 
  const [selectedTask, setSelectedTask] = useState(null); 
  const [socket, setSocket] = useState(null);  

  // Fetch tasks on initial render
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data); 
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchTasks();
  }, []);

  // Initialize socket connection with token
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (token) {
      const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
        auth: {
          token, // Send token as part of auth payload
        },
      });
  
      setSocket(newSocket);
  
      // Listen for 'taskUpdated' event from the server
      newSocket.on('taskUpdated', (updatedTask) => {
        console.log('Task updated:', updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      });
  
      // Clean up the socket connection on component unmount
      return () => newSocket.close();
    }
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
      console.log(`Task with ID ${taskId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    setSelectedTask(taskToEdit); 
    setModalOpen(true); 
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await api.put(`/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? response.data : task)));
      setModalOpen(false); 
      console.log('Task updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="dashboard-container p-6 flex flex-col lg:flex-row lg:gap-6">
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-bold mb-6">All Tasks</h1>
        <TaskList tasks={tasks} handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>
      <div className="lg:w-1/3 mt-6 lg:mt-0">
        <TaskStats />
      </div>
      <Modal
        show={isModalOpen}
        size="md"
        onClose={() => setModalOpen(false)}
      >
        <div className="w-full max-w-lg max-h-[80vh] overflow-auto">
          <Modal.Header>Edit Task</Modal.Header>
          <Modal.Body>
            <TaskEditForm task={selectedTask} onSubmit={handleUpdateTask} />
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
