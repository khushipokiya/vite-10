import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteTodo, setTodos } from '../redux/todoSlice';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://66b6ec8d7f7b1c6d8f1a74d1.mockapi.io/api/v1/todolist';

const TodoListView = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch todos 
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        dispatch(setTodos(response.data));
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };
    fetchTodos();
  }, [dispatch]);

  // Handle edit
  const handleEdit = (todo) => {
    navigate('/edit/' + todo.id, { state: { todo } });
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(deleteTodo(id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Description</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Due Date</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Priority</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{todo.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{todo.description}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(todo.dueDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{todo.priority}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(todo)}
                  className="mr-4 text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoListView;
