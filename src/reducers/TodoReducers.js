// Action type
import TYPE_ACTION from "../actions/TypeAction";

const TodoReducers = (todos = [], action) => {
    switch (action.type) {
        case TYPE_ACTION.TODO.GET:
            return action.payload.data;
        case TYPE_ACTION.TODO.POST:
            return action.payload.data;
        case TYPE_ACTION.TODO.UPDATE:
            return action.payload.data;
        case TYPE_ACTION.TODO.DELETE:
            return action.payload.data;
        default:
            return todos;
    }
};
export default TodoReducers;
