import React, {useEffect} from "react";

// import "./App.css";



function Todo({ todo, index, completeTodo, removeTodo, handleUpdate }) {

    if(!(todo && todo.id)) return null;
    return (
        <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
            {todo.text}

            <div>
                <button onClick={() => handleUpdate(todo, index)}>Edit</button>
                <button onClick={() => completeTodo(index, todo)}>Complete</button>
                <button onClick={() => removeTodo(index,todo.id)}>x</button>
            </div>
        </div>
    );
}
export default Todo