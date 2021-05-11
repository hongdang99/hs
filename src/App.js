import React, { useState, useContext } from "react";
import "./App.css";
import Todo from "./component/Todo.js"
import TodoForm from "./component/TodoForm.js"

const TYPE_STATUS = {
  Active: 'Active',
  Completed: 'Completed',
  All: 'All'
}

function App() {

  // state
  const [todos, setTodos] = useState([
    {
      text: "Học React",
      isCompleted: false
    },
    {
      text: "Học Ielts",
      isCompleted: false
    },
    {
      text: "Build a todo list",
      isCompleted: false
    }
  ]);
  const [indexEdit, setIndexEdit] = useState(null)
  const [status, setStatus] = useState(TYPE_STATUS.All)
  const [allDone, setAllDone] = useState(false)

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

  // handle func
  const addTodo = (text) => {
    const newTodos = [...todos, {text}];
    // const newTodos = todos.map((item) =>{
    //   if (item.text!==text){
    //   }
    // })
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    debugger;
    newTodos[index].isCompleted = true;
    setTodos(newTodos);

  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const handleUpdateText = (value, index) => {
    setIndexEdit(index)
    refInput.current.handleValueText(value.text)
    }

  const handleUpdate = (indexEdit, value) => {
    const newTodos = todos.map((item, index) => {
      if(index === indexEdit) {
        return {...item, text: value}
      } else return item
    })
    // console.log('newTodos', newTodos);
    setTodos(newTodos);
    setIndexEdit(null);
  }
  const handleStatus = (type) => {
    setStatus(type)
  }
  const removeCompletedAll = () => {
    todos.map((item, index) => {item.isCompleted = false});
    setTodos([...todos])
  };
  const completedAll = () => {
    todos.map((item, index) => {
      item.isCompleted = true
    });

    setTodos([...todos]);
  };
  const onClickCheckAllItem = () => {
    setAllDone(!allDone)
    if (allDone) {
      removeCompletedAll();
    } else {
      completedAll();
    }
  };

  const removeAllToDoCompleted = () => {
    setTodos(todos.filter((num) => !num.isCompleted))
  };

    return (
        <div className="app">
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
                handleUpdate={handleUpdate}
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
