import React from 'react';

function TodoItem({ todo, index, toggleTask, deleteTask }) {
  // Set color based on priority
  const priorityColor =
    todo.priority === 'High' ? 'red' :
    todo.priority === 'Medium' ? 'orange' : 'green';

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={todo.done}
          onChange={() => toggleTask(index)}
        />
        <span
          style={{
            textDecoration: todo.done ? 'line-through' : 'none',
            color: priorityColor,
            fontWeight: 'bold'
          }}
        >
          {todo.task} ({todo.priority})
        </span>
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
