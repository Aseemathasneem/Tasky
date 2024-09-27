import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2'; 

const TaskList = ({ tasks, handleDelete,handleEdit}) => {
 

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100';
      case 'medium':
        return 'bg-yellow-100';
      case 'low':
        return 'bg-green-100';
      default:
        return 'bg-white'; // Fallback in case there's no priority
    }
  };
  const confirmDelete = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(taskId); // Call the delete function if confirmed
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        );
      }
    });
  };


  return (
    <div className="task-list grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task._id}
            className={`task-card p-4 rounded-lg shadow-md flex flex-col justify-between ${getPriorityClass(task.priority)}`}
          >
            {/* Task Header */}
            <div className="task-header">
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>

            {/* Task Footer */}
            <div className="task-footer mt-4">
              <div className="text-sm text-gray-500 flex justify-between">
                <p>Status: <span className="font-medium">{task.status}</span></p>
                <p>Due: <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span></p>
              </div>

              
              <div className="flex justify-end mt-2 space-x-4">
                <button 
                onClick={() => handleEdit(task._id)}
                className="text-blue-500 hover:text-blue-700">
                  
                  <FaEdit size={18} />
                  
                </button>
                <button
                  onClick={() => confirmDelete(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={18} />
                </button>
                {task.priority && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      task.priority === 'high'
                        ? 'bg-red-500 text-white'
                        : task.priority === 'medium'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {task.priority}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
