import { useState } from "react";

const TaskEditForm = ({ task, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    status: task?.status || 'pending',
    dueDate: task?.dueDate || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...task, ...formData }); // Pass updated task data
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-2">Title:</label>
        <input 
          type="text" 
          value={formData.title} 
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-2">Description:</label>
        <textarea 
          value={formData.description} 
          onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-2">Priority:</label>
        <select 
          value={formData.priority} 
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-2">Status:</label>
        <select 
          value={formData.status} 
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-2">Due Date:</label>
        <input 
          type="date" 
          value={formData.dueDate} 
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Update Task
        </button>
      </div>
    </form>
  );
};

export default TaskEditForm;
