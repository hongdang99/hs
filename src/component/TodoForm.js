import React, { useState } from "react";
import useDataRequest from "../hooks/useDataRequest";
// import ".App.css";

function TodoForm(props) {
    const {handleUpdate} = props;

    const { refCallback, indexEdit} = props;
    const [value, setValue] = useState("");
    debugger; // Todo by MongLV
    const handleSubmit = (event) => {
        event.preventDefault();
        if(indexEdit) {
            handleUpdate(indexEdit, value)
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
        <form  onSubmit={handleSubmit}>
            {indexEdit && <input
                type="text"
                className="input"
                value={value}
                onChange={handleInput}
            />}
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
