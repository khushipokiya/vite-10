import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteTodo } from '../redux/todoSlice';

const TodoListView = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo) => {
    // Navigate to the TodoForm page with the todo's ID in the URL
    navigate(`/edit/${todo.id}`, { state: { todo } });
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
          {todos.map(todo => (
            <tr key={todo.id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{todo.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{todo.description}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(todo.dueDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{todo.priority}</td>
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
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
