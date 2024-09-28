import { useEffect, useState } from 'react';

export function Todos({ todos }) {
    const [todoList, setTodoList] = useState(todos);

    useEffect(() => {
        setTodoList(todos);
    }, [todos]);

    const markAsCompleted = async (id) => {
        console.log("Marking as completed for ID:", id); // Log the ID

        try {
            const response = await fetch('http://localhost:3000/completed', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send the id in the request body
            });

            const data = await response.json();
            if (response.ok) {
                const updatedTodos = todoList.map((todo) =>
                    todo._id === id ? { ...todo, completed: true } : todo
                );
                setTodoList(updatedTodos);
                alert(data.msg); // Success message
            } else {
                alert(data.message); // Error message
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {todoList.map((todo) => {
                console.log(todo); // Log each todo object to check structure
                return (
                    <div key={todo._id}>
                        <h1>{todo.title}</h1>
                        <h2>{todo.description}</h2>
                        <button
                            onClick={() => markAsCompleted(todo._id)} // Use _id here
                            disabled={todo.completed}
                        >
                            {todo.completed ? "Completed" : "Mark as Done"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
