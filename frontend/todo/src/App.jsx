import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './components/Todo';
import './index.css';  // Importing the CSS file

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get('http://localhost:5000/api/todos');
            setTodos(response.data);
        };
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (!newTodo) return;

        // Send the newTodo as text
        try {
            const response = await axios.post('http://localhost:5000/api/todos', { text: newTodo });
            setTodos([...todos, response.data]);
            setNewTodo('');  // Reset input field
        } catch (error) {
            console.error('Error adding todo:', error.response.data);
        }
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        setTodos(todos.filter((todo) => todo._id !== id));
    };

    const editTodo = async (id, updatedText) => {
        const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { text: updatedText });
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    };

    return (
        <div className="todo-list-container">
            <h1>Todo App</h1>
            <div className="add-todo-container">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button onClick={addTodo}>Add</button>
            </div>

            <div>
                {todos.map((todo) => (
                    <Todo key={todo._id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />
                ))}
            </div>
        </div>
    );
};

export default App;
