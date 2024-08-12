import React from 'react'
import {  useSelector } from 'react-redux';
// Component for viewing todos in a table
const TodoListView = () => {
    const todos = useSelector((state) => state.todos);
    
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
             
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {todos.map(todo => (
              <tr key={todo.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{todo.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{todo.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(todo.dueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{todo.priority}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
 export default TodoListView;  