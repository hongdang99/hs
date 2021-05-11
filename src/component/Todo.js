import React from "react";
// import "./App.css";


function Todo({ todo, index, completeTodo, removeTodo, handleUpdate }) {
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
            {todo.text}

            <div>
                <button onClick={() => handleUpdate(todo, index)}>Edit</button>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => removeTodo(index)}>x</button>
            </div>
        </div>
    );
}
export default Todo