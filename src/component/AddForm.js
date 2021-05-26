import React, { useState } from "react";
import useDataRequest from "../hooks/useDataRequest";

function AddForm (){
    const [data, setData] = useState("");
    const {todos,
        addTodo,
    } = useDataRequest();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!data) return;
        addTodo(data);
        setData("");
    };

    const handleInput = (event) => {
        setData(event.target.value)
    }

    return (
        <form  onSubmit={handleSubmit}>
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