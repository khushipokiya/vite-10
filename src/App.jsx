import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoListView from './components/TodoListView';
import { useDispatch } from 'react-redux';
import { setTodos } from './redux/todoSlice';

const API_URL = 'https://66b6ec8d7f7b1c6d8f1a74d1.mockapi.io/api/v1/todolist';

const App = () => {
  const dispatch = useDispatch();
  
 

  // Fetch initial todos and set in state
  React.useEffect(() => {
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

  return (
    <div className="container p-4 mx-auto">
      <nav className="mb-4">
        <Link to="/" className="mr-4 text-blue-500 hover:underline">Add Todo</Link>
        <Link to="/todos" className="text-blue-500 hover:underline">View Todos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TodoForm />} />
        <Route path="/todos" element={<TodoListView />} />
        <Route
          path="/edit/:id"
          element={
            <TodoForm/>
            }
        />
      </Routes>
    </div>
  );
};

export default App;
