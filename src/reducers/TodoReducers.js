import TYPE_ACTION from "../actions/TypeAction";
import { List, Map } from 'immutable';

const init = List([]);

const TodoReducers = (todos = init, action) => {
    switch (action.type) {
        //----GetData
        case TYPE_ACTION.TODO.GET:
            return List([...action.payload.data]);
        //----AddData
        case TYPE_ACTION.TODO.POST:
            todos.push(Map(action.payload));
            return todos;
        //----UpdataData
        case TYPE_ACTION.TODO.UPDATE:
            // const newTodos = todos.map((item) => {
            //     if(item['id'] === action.payload.itemEdit.id) {
            //         return {...item, text: action.payload.text};
            //     } else return item
            // })
            // return newTodos;
            todos.map((item , index)=>{
                if(item['id'] === action.payload.itemEdit.id){
                    console.log('todos:', todos); // See Log
                    console.log(':', todos.set(index , {...item, text: 'fdsfdsfdssssssss'})); // See Log
                    return todos.set(index , {...item, text: 'fdsfdsfdssssssss'});
                }
            });

        //----DeleteData
        case TYPE_ACTION.TODO.DELETE:
            todos.splice(action.payload.index, 1)
            return [...todos];
        //----CompleteTodo
        case TYPE_ACTION.TODO.COMPLETE_TODO:
            const compTodos = todos.map((item) => {
                if(item['id'] === action.payload.id) {
                    return {...item, isCompleted: true};
                } else return item
            })
            return compTodos;
        //----UncompleteAll
        case TYPE_ACTION.TODO.UNCOMPLETED_ALL:
            return action.payload;
        //----CompleteAll
        case TYPE_ACTION.TODO.TURN_COMPLETED_ALL:
            return action.payload;
        //----DeleteAllCompleteTodo
        case TYPE_ACTION.TODO.DELETE_ALL_TODO_COMPLETED:
            return action.payload;
        //----NothingChange
        default:
            return todos;
    }
};
export default TodoReducers;
