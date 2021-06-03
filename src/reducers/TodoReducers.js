import TYPE_ACTION from "../actions/TypeAction";
import { List, Map } from "immutable";

const init = List([]);

const TodoReducers = (todos = init, action) => {
  switch (action.type) {
    //----GetData
    case TYPE_ACTION.TODO.GET:
      return List([...action.payload.data]);
    //----AddData
    case TYPE_ACTION.TODO.POST:
      return todos.push(action.payload);
    //----UpdataData
    case TYPE_ACTION.TODO.UPDATE:
      // const newTodos = todos.map((item) => {
      //     if(item['id'] === action.payload.itemEdit.id) {
      //         return {...item, text: action.payload.text};
      //     } else return item
      // })
      // return newTodos;

      let index;
      todos.find((item, i) => {
        if (item["id"] === action.payload.itemEdit.id) {
          index = i;
        }
      });

      const arr = todos.set(index, {
        ...todos.get(index),
        text: action.payload.text,
      });
      return arr;

    //----DeleteData
    case TYPE_ACTION.TODO.DELETE:
      const newTodos = todos.splice(action.payload.index, 1);
      return newTodos;
    //----CompleteTodo
    case TYPE_ACTION.TODO.COMPLETE_TODO:
      let toIndex;
      todos.find((item, i) => {
        if (item["id"] === action.payload.id) {
          toIndex = i;
          // return { ...item, isCompleted: true };
        }
      });
      const comp = todos.set(toIndex, {
        ...todos.get(toIndex),
        isCompleted: true,
      });
      return comp;
    // return todos.setIn(['todo', action.payload.id, 'isCompleted'], true)

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
