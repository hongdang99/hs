// Action type
import TYPE_ACTION from "../actions/TypeAction";

const TodoReducers = (todos = [], action) => {
    switch (action.type) {
        //----GetData
        case TYPE_ACTION.TODO.GET:
            return action.payload.data;
        //----AddData
        case TYPE_ACTION.TODO.POST:
            todos.push(action.payload);
            return [...todos];
        //----UpdataData
        case TYPE_ACTION.TODO.UPDATE:
            console.log('action.payload:', action.payload); // See Log
            const newTodos = todos.map((item) => {
                if(item['id'] === action.payload.itemEdit.id) {
                    return {...item, text: action.payload.text};
                } else return item
            })
            return newTodos;
        //----DeleteData
        case TYPE_ACTION.TODO.DELETE:
            console.log('action.payload.index:', action.payload.index); // See Log
            todos.splice(action.payload.index, 1)
            return [...todos];
        //----CompleteTodo
        case TYPE_ACTION.TODO.COMPLETE_TODO:
            console.log('action.payload.id:', action.payload.id); // See Log
            const compTodos = todos.map((item) => {
                if(item['id'] === action.payload.id) {
                    return {...item, isCompleted: true};
                } else return item
            })
            return compTodos;
        //----UncompleteAll
        case TYPE_ACTION.TODO.UNCOMPLETED_ALL:
            console.log('UNCOMPLETED_ALL _ action.payload:', action.payload); // See Log
            return action.payload;
        //----CompleteAll
        case TYPE_ACTION.TODO.TURN_COMPLETED_ALL:
            console.log('TURN_COMPLETED_ALL _ action.payload:', action.payload); // See Log
            return action.payload;
        //----DeleteAllCompleteTodo
        case TYPE_ACTION.TODO.DELETE_ALL_TODO_COMPLETED:
            debugger;
            console.log('action.payload:', action.payload); // See Log
            debugger;
            return action.payload;
        //----NothingChange
        default:
            return todos;
    }
};
export default TodoReducers;
