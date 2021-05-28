import React, { useState } from "react";
import useDataRequest from "../hooks/useDataRequest";
import {Prompt} from "react-router-dom";
function AddForm (){
    const [data, setData] = useState("");
    let [isBlocking, setIsBlocking] = useState(false);
    const {
        addTodo,
    } = useDataRequest();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!data) return;
        addTodo(data);
        setData("");
        setIsBlocking(false)
    };

    const handleInput = (event) => {
        setData(event.target.value)
        setIsBlocking(event.target.value)
    }

    return (
        <form  onSubmit={handleSubmit}>
            <Prompt
                when={isBlocking}
                message={location =>
                    `Are you sure you want to go to ${location.pathname}`
                }
            />
            <input
                type="text"
                placeholder="Just type something you need todo"
                className="input"
                value={data}
                onChange={handleInput}
            />
        </form>
    );
}
export default AddForm