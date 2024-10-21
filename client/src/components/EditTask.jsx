import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskEditForm from '../components/TaskEditForm';
import api from '../utils/axios'

const EditTask = () => {
  const { state } = useLocation(); // Access the task passed via navigate
  const { task } = state; // Destructure the task from the state
  const navigate = useNavigate();
  const { taskId } = useParams(); // TaskId can be used if needed

  const handleUpdateTask = async (updatedTask) => {
    try {
      
      const response = await api.put(`/tasks/${updatedTask._id}`, updatedTask);
      console.log('Task updated successfully:', response.data);
      navigate('/dashboard'); // Redirect to dashboard after update
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      {task ? (
        <TaskEditForm task={task} onSubmit={handleUpdateTask} />
      ) : (
        <p>Loading task data...</p>
      )}
    </div>
  );
};

export default EditTask;
