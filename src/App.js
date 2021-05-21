import React, { useState, useContext } from "react";
import "./App.css";
import Todo from "./component/Todo.js"
import TodoForm from "./component/TodoForm.js"
import { axios } from "./axios";
import useDataRequest from "./hooks/useDataRequest";

const TYPE_STATUS = {
  Active: 'Active',
  Completed: 'Completed',
  All: 'All'
}

function App() {
  // hooks
  const {todos,
    getTodos,
    addTodo,
    removeTodo,
    handleUpdate,
    completeTodo,
    removeCompletedAll,
    completedAll, removeAllToDoCompleted} = useDataRequest();

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

  // const completedAll = async () => {
  //
  //   for (const item of todos) {
  //     if (item.isCompleted === false) {
  //       const response = await axios.put(`/todo/${item.id}`, {...item, isCompleted: true}).catch((err) => {
  //         console.log("TickAll Fail: ", err);
  //       });if(response) {
  //         item.isCompleted = true;
  //       }
  //     }
  //   }
  //   console.log('todoTa', todos);
  //   getTodos([...todos])
  //   console.log('todosthis:', todos);
  //   // todos.map((item, index) => {
  //   //   item.isCompleted = true
  //   // });
  //   // setTodos([...todos]);
  // };

  // const removeAllToDoCompleted = async () => {
  //   for (const item of todos) {
  //     console.log('item:', item);
  //     if (item.isCompleted === true) {
  //       const response = await axios.delete(`/todo/${item.id}`).catch((err) => {
  //         console.log("RemoveAll Fail: ", err);
  //       });
  //     }
  //   }
  //   getTodos(todos.filter((num) => !num.isCompleted))
  // };



  // lifecycle
  React.useEffect(() => {
    getTodos();
  }, []);

  // ref
  const refInput = React.useRef();

  // logic
  const filterByStatus = () => {
    let toDoListCompleted;
    switch (status) {
      case TYPE_STATUS.Active:
        return todos.filter(item => item.isCompleted === false)
      case TYPE_STATUS.Completed:
        return toDoListCompleted = todos.filter(item => item.isCompleted === true)
      default:
        return todos;
    }
  }

  //handle

  const handleStatus = (type) => {
    setStatus(type)
  }

  const handleUpdateText = (todo, index) => {
    setIndexEdit(index);
    setItemEdit(todo);
    console.log('todo', todo);
    refInput.current.handleValueText(todo.text)
  }

  const onClickCheckAllItem = () => {
    setAllDone(!allDone)
    console.log('allDone', allDone);
    if (allDone) {
      removeCompletedAll();
    } else {
      completedAll();
    }
  };

  // const removeCompletedAll = () => {
  //   todos.map((item, index) => {item.isCompleted = false});
  //   setTodos([...todos])
  // };
  // const completedAll = () => {
  //   todos.map((item, index) => {
  //     item.isCompleted = true
  //   });
  //   setTodos([...todos]);
  // };


  // const removeAllToDoCompleted = () => {
  //   setTodos(todos.filter((num) => !num.isCompleted))
  // };

  return (
        <div className="app">
          <h1>Xử lý theo kiểu hooks</h1>
          <div className="todo-list">
            {filterByStatus().map((todo, index) => (
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
