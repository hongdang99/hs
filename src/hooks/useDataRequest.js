import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {selectTodo, selectStatus, getFilterByStatus} from "./../reselect/connector"

import TYPE_STATUS from "../util/Type_Status";
import TYPE_ACTION from "../actions/TypeAction";
import {createSelector} from "reselect";


function useDataRequest() {

    // hooks
    const dispatch = useDispatch();
    const todos = useSelector(selectTodo);
    // const status = useSelector(selectStatus)
    // const filterByStatus = useSelector(getFilterByStatus)

    // handle logic
    const getTodos = () => dispatch({type: TYPE_ACTION.TODO.GET_SAGA});
    const addTodo = (value) => {
        const dataDefault = {text: value, isCompleted: false};
        dispatch({type: TYPE_ACTION.TODO.POST_SAGA, payload: dataDefault})
    };
    const handleUpdate = (indexEdit, value, callBackUpdate, itemEdit) => {
        dispatch({type: TYPE_ACTION.TODO.UPDATE_SAGA, payload: {indexEdit, value, callBackUpdate, itemEdit}})
    };
    const removeTodo = (index,id) => {
        dispatch({type:TYPE_ACTION.TODO.DELETE_SAGA, payload: {index, id}})
    };
    const completeTodo = (index, todo) => {
        dispatch({type: TYPE_ACTION.TODO.COMPLETE_TODO_SAGA, payload: {index, todo}})
    };
    const removeCompletedAll = () => {
        dispatch({type: TYPE_ACTION.TODO.UNCOMPLETED_ALL_SAGA})
    };
    const completedAll = () => {
        dispatch({type: TYPE_ACTION.TODO.TURN_COMPLETED_ALL_SAGA})
    };
    const removeAllToDoCompleted = () => {
        dispatch({type: TYPE_ACTION.TODO.DELETE_ALL_TODO_COMPLETED_SAGA})
    };

    // const getFilterByStatus = createSelector(
    //     [selectStatus, selectTodo],(status, todos) => {
    //         switch (status) {
    //             case TYPE_STATUS.Active:
    //                 return todos.filter(item => item.isCompleted === false)
    //             case TYPE_STATUS.Completed:
    //                 return todos.filter(item => item.isCompleted === true)
    //             default:
    //                 return todos;
    //         }
    //     }
    // )
    // const handleStatus = (type) => {
    //     '`TYPE_STATUS.${type}`'
    //     console.log('type:', type); // See Log
    // }
    const onClickCheckAllItem = () => {
        const done = todos.filter(item => item.isCompleted === true)
        const comp = todos.length === done.length ? '1' : '0';
        if (comp==='1') {
            removeCompletedAll();
        } else {
            completedAll();
        }
    };
    // const filterByStatus = (status) => {
    //     switch (status) {
    //         case TYPE_STATUS.Active:
    //             return todos.filter(item => item.isCompleted === false)
    //         case TYPE_STATUS.Completed:
    //             return todos.filter(item => item.isCompleted === true)
    //         default:
    //             return todos;
    //     }
    // };

    return ({todos, getTodos, addTodo, removeTodo, handleUpdate, completeTodo, removeCompletedAll, completedAll, removeAllToDoCompleted, onClickCheckAllItem });
}

export default useDataRequest;