import { createStore } from 'redux';

export const ACTIONS = {
    ADD_TODO: 'ADD_TODO',
    COMPLETE_TODO: 'COMPLETE_TODO',
    EDIT_TODO: 'EDIT_TODO',
    DELETE_TODO: 'DELETE_TODO',
    CHECK_ALL: 'CHECK_ALL',
    FILTER_TODO: 'FILTER_TODO',
};

const initialState = {
    todos: {},
    indexEdit: null,
    itemEdit: null,
    value: "",
    allDone: false,
};
function todoReducer(state= initialState, action){
    switch (action.type){
        case ACTIONS.ADD_TODO:{
           const {value} = state;

        }
    }
}