import React, { useState, useContext } from "react";
import "./App.css";
import Todo from "./component/Todo.js"
import TodoForm from "./component/TodoForm.js"
import { axios } from "./axios";
import { connect } from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "./App2/Container";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const TYPE_STATUS = {
    Active: 'Active',
    Completed: 'Completed',
    All: 'All'
}

function App2(props) {
    const {todos, get, add, update, remove, complete, unCompletedAll, turnCompletedAll, deleteAllTodoCompleted} = props;

    // state
    const [indexEdit, setIndexEdit] = useState(null)
    const [status, setStatus] = useState(TYPE_STATUS.All)
    const [allDone, setAllDone] = useState(false)
    const [itemEdit, setItemEdit] = useState(null);
    // API (Promise)
    const getTodos = async () => {
        const response = await axios.get("/todo").catch((err) => {
            console.log("Error:", err);
        });
        if (response && response.data) {
            get(response.data);
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
            const newTodos = [...todos, response.data];
            add(newTodos);



    };

    const removeTodo = async (index,id) => {
        const response = await axios.delete(`/todo/${id}`).catch((err) => {
            console.log("Error deleting: ", err);
        });

        if (response) {
            console.log('response', response);
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            remove(newTodos);
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
                update(newTodos);
                setIndexEdit(null);
                setItemEdit(null);
            } else alert(response.statusText)
        } else alert('Ko co id')
    }
    const completeTodo = async (index, todo) => {
        const response = await axios.put(`/todo/${todo.id}`, {...todo, isCompleted: true}).catch((err) => {
            console.log("Error Decorated: ", err);
        });
        console.log('response', response);
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        complete(newTodos);
    };

    const removeCompletedAll = async () => {
        console.log('todosX', todos); // MongLV log fix bug
        for (const item of todos) {
            console.log('item:', item.id); // MongLV log fix bug
            if (item.isCompleted === true) {
                const response = await axios.put(`/todo/${item.id}`, {...item, isCompleted: false}).catch((err) => {
                    console.log("RemoveAll Fail: ", err);

                });item.isCompleted = false;
            }
        }
        console.log('todoXa', todos);
        unCompletedAll([...todos])
    }

    const completedAll = async () => {
        for (const item of todos) {
            if (item.isCompleted === false) {
                const response = await axios.put(`/todo/${item.id}`, {...item, isCompleted: true}).catch((err) => {
                    console.log("TickAll Fail: ", err);

                });item.isCompleted = true;
            }
        }
        console.log('todoTa', todos);
        turnCompletedAll([...todos])
        // todos.map((item, index) => {
        //   item.isCompleted = true
        // });
        // setTodos([...todos]);
    };
    const removeAllToDoCompleted = async () => {
        for (const item of todos) {
            console.log('item:', item.id); // MongLV log fix bug
            if (item.isCompleted === true) {
                const response = await axios.delete(`/todo/${item.id}`).catch((err) => {
                    console.log("RemoveAll Fail: ", err);
                });
            }
        }
        deleteAllTodoCompleted(todos.filter((num) => !num.isCompleted))
    };

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


    const handleUpdateText = async (todo, index) => {
        setIndexEdit(index);
        setItemEdit(todo);
        console.log('todo', todo); // MongLV log fix bug
        refInput.current.handleValueText(todo.text)
    }


    const handleStatus = (type) => {
        setStatus(type)
    }
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
    const onClickCheckAllItem = () => {
        setAllDone(!allDone)
        console.log('allDone', allDone); // MongLV log fix bug
        if (allDone) {
            removeCompletedAll();
        } else {
            completedAll();
        }
    };

    // const removeAllToDoCompleted = () => {
    //   setTodos(todos.filter((num) => !num.isCompleted))
    // };

    return (

        <div className="app">
            <h1>Xử lý theo kiểu truyền thống</h1>
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

                {/*<TodoForm*/}
                {/*    addTodo={addTodo}*/}
                {/*    indexEdit={indexEdit}*/}
                {/*    refCallback={refInput}*/}
                {/*    handleUpdate={handleUpdate}*/}
                {/*/>*/}

                <button onClick={() => handleStatus(TYPE_STATUS.All)}>{TYPE_STATUS.All}</button>
                <button onClick={() => handleStatus(TYPE_STATUS.Completed)}>{TYPE_STATUS.Completed}</button>
                <button onClick={() => handleStatus(TYPE_STATUS.Active)}>{TYPE_STATUS.Active}</button>
                <button onClick={onClickCheckAllItem}>CheckAll</button>
                <button onClick={removeAllToDoCompleted}>Clear_Completed</button>

            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App2);
