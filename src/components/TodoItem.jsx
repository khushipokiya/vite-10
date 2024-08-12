// src/components/TodoItem.jsx
import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="flex flex-col p-2 border-b border-gray-200 mb-2">
      <div className="flex items-center justify-between">
        <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          <strong>{todo.title}</strong> (Priority: {todo.priority})
        </span>
        <button onClick={() => onToggle(todo.id)} className="bg-green-500 text-white p-1 rounded mr-2">Edit</button>
        <button onClick={() => onDelete(todo.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
      </div>
      <p className="text-gray-700 mt-1">{todo.description}</p>
      <p className="text-gray-500 text-sm">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
    </div>
  );
};

export default TodoItem;
