import React from 'react';
import {axios} from "../axios";
// import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux'
import TYPE_ACTION from "../actions/TypeAction";

function useDataRequest() {
    // hooks
    const dispatch = useDispatch();
    const todos = useSelector(state => state['todos'])

    // handle logic
    const getTodos = async () => {
        const response = await axios.get("/todo").catch((err) => {
            console.log("Error:", err);
        });
        if (response && response.data) {
            // redux
            dispatch({type: TYPE_ACTION.TODO.GET, payload: {data: response.data}})
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
            const newTodos = [...todos, response.data];
            dispatch({type: TYPE_ACTION.TODO.POST, payload: {data: [...newTodos]}})
        }
    };

    const removeTodo = async (index,id) => {
        const response = await axios.delete(`/todo/${id}`).catch((err) => {
            console.log("Error deleting: ", err);
        });
        if (response) {
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            dispatch({type: TYPE_ACTION.TODO.DELETE, payload: {data: [...newTodos]}})
        }
    };

    const handleUpdate = async (indexEdit, value, callBackUpdate, itemEdit) => {
        if(itemEdit && itemEdit.id) {
            const response = await axios.put(`/todo/${itemEdit.id}`, {...itemEdit, text: value}).catch((err) => {
                console.log("Error deleting: ", err);
            });
            if(response && (response.status === 200 || response.statusText === 'OK')) {
                const newTodos = todos.map((item, index) => {
                    if(index === indexEdit) {
                        return {...item, text: value}
                    } else return item
                })
                dispatch({type: TYPE_ACTION.TODO.UPDATE, payload: {data: [...newTodos]}})
                callBackUpdate();
            } else alert(response.statusText)
        } else alert('Ko co id')
    };

    const completeTodo = async (index, todo) => {
        const response = await axios.put(`/todo/${todo.id}`, {...todo, isCompleted: true}).catch((err) => {
            console.log("Error Decorated: ", err);
        });
        console.log('response', response);
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        dispatch({type: TYPE_ACTION.TODO.UPDATE, payload: {data: newTodos}})
    };

    const removeCompletedAll = async () => {
        for (const item of todos) {
            if (item.isCompleted === true) {
                item.isCompleted = false;
                await axios.put(`/todo/${item.id}`, {...item, isCompleted: false}).catch((err) => {
                    console.log("RemoveAll Fail: ", err);
                });
                // if(response) {
                //     item.isCompleted = false;
                // }

            }
        }
        dispatch({type: TYPE_ACTION.TODO.GET, payload: {data: [...todos]}})
    };

    const completedAll = async () => {

        for (const item of todos) {
            if (item.isCompleted === false) {
                const response = await axios.put(`/todo/${item.id}`, {...item, isCompleted: true}).catch((err) => {
                    console.log("TickAll Fail: ", err);
                });if(response) {
                    item.isCompleted = true;
                }
            }
        }
        dispatch({type: TYPE_ACTION.TODO.GET, payload: {data: [...todos]}})
    };

    const removeAllToDoCompleted = async () => {
        for (const item of todos) {
            console.log('item:', item);
            if (item.isCompleted === true) {
                const response = await axios.delete(`/todo/${item.id}`).catch((err) => {
                    console.log("RemoveAll Fail: ", err);
                });
            }
        }
        getTodos(todos.filter((num) => !num.isCompleted))

    };

    return ({todos, getTodos, addTodo, removeTodo, handleUpdate, completeTodo, removeCompletedAll, completedAll, removeAllToDoCompleted});
}

export default useDataRequest;