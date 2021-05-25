import TYPE_ACTION from "../actions/TypeAction";
import {complete, deleteAllTodoCompleted, get, remove, turnCompletedAll, unCompletedAll} from "../actions";


export const mapStateToProps = (state) => {
    const todos = state['todos'];
    return {
        todos,
    }
};

export const mapDispatchToProps = (dispatch) => ({
    get: (data) => dispatch({
        type: TYPE_ACTION.TODO.GET,
        payload: {data}
    }),
    add: (data) => dispatch({
        type: TYPE_ACTION.TODO.POST,
        payload: {data}
    }),
    update: (data) => dispatch({
        type: TYPE_ACTION.TODO.UPDATE,
        payload: {data}
    }),
    remove: (data) => dispatch({
        type: TYPE_ACTION.TODO.DELETE,
        payload: {data}
    }),
    complete : (data) => dispatch({
        type: TYPE_ACTION.TODO.COMPLETE_TODO,
        payload: {data}
    }),
    unCompletedAll : (data) => dispatch({
        type: TYPE_ACTION.TODO.UNCOMPLETED_ALL,
        payload: {data}
    }),
    turnCompletedAll: (data) => dispatch({
        type: TYPE_ACTION.TODO.TURN_COMPLETED_ALL,
        payload: {data}
    }),
    deleteAllTodoCompleted: (data) => dispatch({
        type: TYPE_ACTION.TODO.DELETE_ALL_TODO_COMPLETED,
        payload: {data}
    }),
});