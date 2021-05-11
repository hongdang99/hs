import React, { useState } from "react";
// import ".App.css";

function TodoForm(props) {
    const { addTodo, refCallback, indexEdit, handleUpdate } = props;
    const [value, setValue] = useState("mong");

    const handleSubmit = (event) => {
        console.log('event:', event);
        event.preventDefault();
        debugger;
        // edit
        if(indexEdit) {
            handleUpdate(indexEdit, value)
        } else {
            // Add
            if (!value) return;
            addTodo(value);
        }
        setValue("");

    };
    const handleInput = (event) => {
        setValue(event.target.value)
    };
    const handleValueText = (text) => {
        setValue(text)
    }

    React.useEffect(() => {
        refCallback.current = {
            handleValueText,
        }
    },[])

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                onChange={handleInput}
            />
        </form>
    );
}

TodoForm.defaultProps = {
    // addTodo: () => {},
    refCallback: {
        current: null,
    }
};
export default TodoForm
