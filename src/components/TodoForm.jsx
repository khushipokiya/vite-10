import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addTodo, updateTodo } from '../redux/todoSlice';

const API_URL = 'https://66b6ec8d7f7b1c6d8f1a74d1.mockapi.io/api/v1/todolist';

const TodoForm = ({ initialTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const todo = initialTodo || location.state?.todo;

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDueDate(todo.dueDate);
      setPriority(todo.priority);
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      setError('Title is required');
      return;
    }
    setError('');

    const newTodo = {
      title,
      description,
      dueDate,
      priority,
    };

    try {
      if (todo) {
        // Update existing todo
        await axios.put(`${API_URL}/${todo.id}`, newTodo);
        dispatch(updateTodo({ ...todo, ...newTodo }));
      } else {
        // Add new todo
        const response = await axios.post(API_URL, newTodo);
        dispatch(addTodo(response.data));
      }
      navigate('/todos');
    } catch (error) {
      console.error('Failed to save todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">{todo ? 'Edit Todo' : 'Add New Todo'}</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description (optional)"
          rows="4"
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block mb-1 text-sm font-medium text-gray-700">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block mb-1 text-sm font-medium text-gray-700">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {todo ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;
