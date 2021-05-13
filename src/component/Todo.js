import React, {useEffect} from "react";

// import "./App.css";



function Todo({ todo, index,id, completeTodo, removeTodo, handleUpdate }) {

    return (
        <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
            {todo.text}

            <div>
                <button onClick={() => handleUpdate(todo, index,id)}>Edit</button>
                <button onClick={() => completeTodo(index,id)}>Complete</button>
                <button onClick={() => removeTodo(index,id)}>x</button>
            </div>
        </div>
    );
}
export default Todo