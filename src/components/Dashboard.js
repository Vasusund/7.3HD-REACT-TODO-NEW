import React, { useState, useEffect } from 'react';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem';

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  // Load todos from localStorage for this user
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(`todos_${username}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium'); // default priority

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`todos_${username}`, JSON.stringify(todos));
  }, [todos, username]);

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTodos([...todos, { task, done: false, priority }]);
      setTask('');
      setPriority('Medium'); // reset to default
    }
  };

  const toggleTask = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Hello, {username}</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form onSubmit={addTask} className="mb-4 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select
          className="form-select me-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className="btn btn-success">Add</button>
      </form>

      <ul className="list-group">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
