import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await api.get('/todos');
        setTodos(response.data.data);
    };

    const addTodo = async () => {
        if (newTodo.trim()) {
            const response = await api.post('/todos', { title: newTodo });
            setTodos([...todos, response.data.data]);
            setNewTodo('');
        }
    };

    const updateTodo = async (id, completed) => {
        await api.put(`/todos/${id}`, { completed: !completed });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await api.delete(`/todos/${id}`);
        fetchTodos();
    };

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Nova tarefa"
            />
            <button onClick={addTodo}>Adicionar</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                            }}
                            onClick={() => updateTodo(todo.id, todo.completed)}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;