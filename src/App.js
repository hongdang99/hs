import React, {useState} from "react";
import "./App.css";
import Todo from "./component/Todo.js"
import TodoForm from "./component/TodoForm.js"
import useDataRequest from "./hooks/useDataRequest";
import TYPE_STATUS from "./util/Type_Status";

function App() {
  // hooks
  const {todos,
    getTodos,
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
  const [itemEdit, setItemEdit] = useState(null);

  // func handle
  const callBackUpdate = () => {
    setIndexEdit(null);
    setItemEdit(null);
  }
  const handleClickUpdate = (indexEdit, value) => {
    handleUpdate(indexEdit, value, callBackUpdate, itemEdit);
  }

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

  React.useEffect(() => {
    getTodos();
  }, []);

  const onClickCheckAllItem = () => {
    const done = todos.filter(item => item.isCompleted === true)
    const comp = todos.length === done.length ? '1' : '0';
    if (comp==='1') {
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
                // addTodo={addTodo}
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
