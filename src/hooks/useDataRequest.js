import React from 'react';
import {axios} from "../axios";
import {useDispatch, useSelector} from 'react-redux'
import {add, complete, deleteAllTodoCompleted, get, remove, turnCompletedAll, unCompletedAll, update} from "../actions";
import TYPE_STATUS from "../util/Type_Status";
import TYPE_ACTION from "../actions/TypeAction";
function useDataRequest(props) {

    // hooks
    const dispatch = useDispatch();
    const todos = useSelector(state => state['todos']);
    const itemEdit = useSelector(state1 => state1['itemEdit'])
    const value = useSelector(state1 => state1['value'])

    // handle logic
    const getTodos = () => dispatch({type: TYPE_ACTION.TODO.GET_SAGA});

    const addTodo = async (value) => {
        const dataDefault = {
            text: value,
            isCompleted: false,
        };
        dispatch({
            type: TYPE_ACTION.TODO.POST_SAGA,
            data: dataDefault
        })
    };

    const removeTodo = async (index,id) => {

            dispatch({type:TYPE_ACTION.TODO.DELETE_SAGA, payload: {index, id}})
    };

    const handleUpdate = async (indexEdit, value, callBackUpdate, itemEdit) => {
        debugger
        if(itemEdit && itemEdit.id) {
            const response = await axios.put(`/todo/${itemEdit.id}`, {...itemEdit, text: value}).catch((err) => {
                console.log("Error deleting: ", err);
            });
                const newTodos = todos.map((item, index) => {
                    if(index === indexEdit) {
                        return {...item, text: value}
                    } else return item
                })
                dispatch(update([...newTodos]))
                callBackUpdate();
        } else alert('Ko co id')
    };

    const completeTodo = async (index, todo) => {
        const response = await axios.put(`/todo/${todo.id}`, {...todo, isCompleted: true}).catch((err) => {
            console.log("Error Decorated: ", err);
        });
        console.log('response', response);
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        dispatch(complete(newTodos))
    };

    const removeCompletedAll = async () => {
        for (const item of todos) {
            if (item.isCompleted === true) {
                item.isCompleted = false;
                await axios.put(`/todo/${item.id}`, {...item, isCompleted: false}).catch((err) => {
                    console.log("RemoveAll Fail: ", err);
                });
            }
        }
        dispatch(unCompletedAll([...todos]))
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
        dispatch(turnCompletedAll([...todos]))
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
        // getTodos(todos.filter((num) => !num.isCompleted))
        dispatch(deleteAllTodoCompleted(todos.filter((num) => !num.isCompleted)))

    };
    const filterByStatus = (status) => {
        let toDoListCompleted;
        switch (status) {
            case TYPE_STATUS.Active:
                return todos.filter(item => item.isCompleted === false)
            case TYPE_STATUS.Completed:
                return toDoListCompleted = todos.filter(item => item.isCompleted === true)
            default:
                return todos;
        }
    };

    React.useEffect(() => {
        getTodos();
    }, []);



    return ({todos, itemEdit,getTodos, addTodo, removeTodo, handleUpdate, completeTodo, removeCompletedAll, completedAll, removeAllToDoCompleted, filterByStatus, });
}

export default useDataRequest;