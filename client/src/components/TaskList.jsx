const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      <h2 className="text-2xl mb-4">Your Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
