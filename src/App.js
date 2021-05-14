import React, { useState, useContext } from "react";
import "./App.css";
import Todo from "./component/Todo.js"
import TodoForm from "./component/TodoForm.js"
import { axios } from "./axios";

const TYPE_STATUS = {
  Active: 'Active',
  Completed: 'Completed',
  All: 'All'
}

function App() {

  // state
  const [todos, setTodos] = useState([]);
  const [indexEdit, setIndexEdit] = useState(null)
  const [status, setStatus] = useState(TYPE_STATUS.All)
  const [allDone, setAllDone] = useState(false)
  const [itemEdit, setItemEdit] = useState(null);

  // API
  const getTodos = async () => {
    const response = await axios.get("/todo").catch((err) => {
      console.log("Error:", err);
    });
    if (response && response.data) {
      setTodos(response.data);
      console.log("todo:",todos)
    }
  };

  const addTodo = async (value) => {

    const dataDefault = {
      text: value,
      isCompleted: false,
    };
    // console.log("text:",text);
    const response = await axios.post("/todo", dataDefault).catch((err) => {
      console.log("Error: ", err);
    });

    if (response && response.data && typeof response.data === 'object') {
      console.log('response', response);
      const newTodos = [...todos, response.data];
      setTodos(newTodos);
      // console.log('todos', todos);
    }

  };

  const removeTodo = async (index,id) => {
    const response = await axios.delete(`/todo/${id}`).catch((err) => {
      console.log("Error deleting: ", err);
    });

    if (response) {
      console.log('response', response);
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    };
  };

  const handleUpdate = async (indexEdit, value) => {
    if(itemEdit && itemEdit.id) {
      const response = await axios.put(`/todo/${itemEdit.id}`, {...itemEdit, text: value}).catch((err) => {
        console.log("Error deleting: ", err);
      });
      console.log('response', response);
      if(response && (response.status === 200 || response.statusText === 'OK')) {
        const newTodos = todos.map((item, index) => {
          if(index === indexEdit) {
            return {...item, text: value}
          } else return item
        })
        // console.log('newTodos', newTodos);
        setTodos(newTodos);
        setIndexEdit(null);
        setItemEdit(null);
      } else alert(response.statusText)
    } else alert('Ko co id')
  }

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
  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);

  };

  const handleUpdateText = async (todo, index, id) => {
    const putData = {...todo};
    delete putData.id;
    setIndexEdit(index);
    setItemEdit(todo);
    refInput.current.handleValueText(todo.text)
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
