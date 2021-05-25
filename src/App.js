import React, { useState, useContext } from "react";
import "./App.css";
import Todo from "./component/Todo.js"
import TodoForm from "./component/TodoForm.js"
import { axios } from "./axios";
import useDataRequest from "./hooks/useDataRequest";
import TYPE_STATUS from "./util/Type_Status";
// const TYPE_STATUS = {
//   Active: 'Active',
//   Completed: 'Completed',
//   All: 'All'
// }

function App() {
  // hooks
  const {todos,
    // getTodos,
    addTodo,
    removeTodo,
    handleUpdate,
    completeTodo,
    removeCompletedAll,
    completedAll,
    removeAllToDoCompleted,
    filterByStatus,

  } = useDataRequest();

  // state
  const [indexEdit, setIndexEdit] = useState(null)
  const [status, setStatus] = useState(TYPE_STATUS.All)
  const [allDone, setAllDone] = useState(false)
  const [itemEdit, setItemEdit] = useState(null);

  // func handle
  const callBackUpdate = () => {
    setIndexEdit(null);
    setItemEdit(null);
  }
  const handleClickUpdate = (indexEdit, value) => handleUpdate(indexEdit, value, callBackUpdate, itemEdit);

  // ref
  const refInput = React.useRef();

  const handleStatus = (type) => {
    setStatus(type)
  }

  const handleUpdateText = (todo, index) => {
    setIndexEdit(index);
    setItemEdit(todo);
    refInput.current.handleValueText(todo.text)
  }



  const onClickCheckAllItem = () => {
    setAllDone(!allDone)
    if (allDone) {
      removeCompletedAll();
    } else {
      completedAll();
    }
  };

  return (
        <div className="app">
          <h1>Xử lý theo kiểu hooks</h1>
          <div className="todo-list">
            {filterByStatus(status).map((todo, index) => (
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
                addTodo={addTodo}
                indexEdit={indexEdit}
                refCallback={refInput}
                handleUpdate={handleClickUpdate}
            />

            <button onClick={() => handleStatus(TYPE_STATUS.All)}>{TYPE_STATUS.All}</button>
            <button onClick={() => handleStatus(TYPE_STATUS.Completed)}>{TYPE_STATUS.Completed}</button>
            <button onClick={() => handleStatus(TYPE_STATUS.Active)}>{TYPE_STATUS.Active}</button>
            <button onClick={onClickCheckAllItem}>CheckAll</button>
            <button onClick={removeAllToDoCompleted}>Clear_Completed</button>

          </div>
        </div>
    );

}
export default App;
