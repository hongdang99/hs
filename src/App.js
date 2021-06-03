import React, { useState } from "react";
import "./App.css";
import Todo from "./component/Todo.js";
import TodoForm from "./component/TodoForm.js";
import useDataRequest from "./hooks/useDataRequest";
import TYPE_STATUS from "./util/Type_Status";
import { getFilterByStatus } from "./reselect/connector";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

// const selectStatus = createSelector(
//     (state, status) => status,
//     status => status,
// )
// const getFilterByStatus = createSelector(
//     [selectTodo, selectStatus],
//     (todos, status) => {
//       debugger; // Stop st
//       switch (status) {
//         case TYPE_STATUS.Active:
//           debugger; // Stop st
//           console.log('here:'); // See Log
//           return todos.filter(item => item.isCompleted === false)
//         case TYPE_STATUS.Completed:
//           return todos.filter(item => item.isCompleted === true)
//         default:
//           return todos;
//       }
//     }
// )

function App() {
  // hooks
  const {
    getTodos,
    removeTodo,
    handleUpdate,
    completeTodo,
    removeAllToDoCompleted,
    onClickCheckAllItem,
  } = useDataRequest();
  // state
  const [indexEdit, setIndexEdit] = useState(null);
  const [status, setStatus] = useState(TYPE_STATUS.All);
  const [itemEdit, setItemEdit] = useState(null);

  const filterByStatus = useSelector((state) =>
    getFilterByStatus(state, status)
  );
  console.log("filterByStatus:", filterByStatus); // See Log

  // func handle
  const callBackUpdate = () => {
    setIndexEdit(null);
    setItemEdit(null);
  };
  const handleClickUpdate = (indexEdit, value) => {
    handleUpdate(indexEdit, value, callBackUpdate, itemEdit);
  };

  // ref
  const refInput = React.useRef();

  const handleStatus = (type) => {
    setStatus(type);
  };

  const handleUpdateText = (todo, index) => {
    setIndexEdit(index);
    setItemEdit(todo);
    refInput.current.handleValueText(todo.text);
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="app">
      <h1>Xử lý theo kiểu hooks</h1>
      <div className="todo-list">
        {filterByStatus.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            handleUpdate={handleUpdateText}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}

        <TodoForm
          indexEdit={indexEdit}
          refCallback={refInput}
          handleClickUpdate={handleClickUpdate}
        />

        <button onClick={() => handleStatus(TYPE_STATUS.All)}>
          {TYPE_STATUS.All}
        </button>
        <button onClick={() => handleStatus(TYPE_STATUS.Completed)}>
          {TYPE_STATUS.Completed}
        </button>
        <button onClick={() => handleStatus(TYPE_STATUS.Active)}>
          {TYPE_STATUS.Active}
        </button>
        <button onClick={onClickCheckAllItem}>CheckAll</button>
        <button onClick={removeAllToDoCompleted}>Clear_Completed</button>
      </div>
    </div>
  );
}
export default App;
