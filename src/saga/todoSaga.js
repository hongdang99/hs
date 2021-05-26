import { call, put, take } from 'redux-saga/effects';
import {get, remove} from "../actions";
import TYPE_ACTION from "../actions/TypeAction";
import {axios} from "../axios";


function* WatchGetTodosSaga() {
    while (true) {
        yield take(TYPE_ACTION.TODO.GET_SAGA);
        const response = yield axios.get("/todo").catch((err) => {
            console.log("Error:", err);
        });
        yield put({type: TYPE_ACTION.TODO.GET, payload: { data: response.data}}); // dispatch
    }
}
function* WatchAddTodoSaga(){
    while(true){
        const takeAction = yield take(TYPE_ACTION.TODO.POST_SAGA);
        const {data} = takeAction;
        const response = yield axios.post("/todo", data).catch((err) => {
            console.log("Error: ", err);
        });
        yield put({type: TYPE_ACTION.TODO.POST, payload: { data: response.data}})
    }
}
function* WatchRemoveTodo () {
    while (true) {
        const { payload} = yield take(TYPE_ACTION.TODO.DELETE_SAGA)
        const {id, index} = payload
        const response = yield axios.delete(`/todo/${id}`).catch((err) => {
            console.log("Error deleting: ", err);
        });
        yield put({type: TYPE_ACTION.TODO.DELETE, payload: {index}})
    }
}
// function* WatchCompleteTodo (){
//     while(true){
//         const {payload} = yield take(TYPE_ACTION.TODO.COMPLETE_TODO_SAGA)
//         const {todo, index } =payload
//         const response = yield axios.put(`/todo/${todo.id}`, {...todo, isCompleted: true}).catch((err) => {
//             console.log("Error Decorated: ", err);
//         });
//     }
// }
function* WatchRemoveCompletedAll (){
    while (true){
        const {payload} = yield take(TYPE_ACTION.TODO.UNCOMPLETED_ALL_SAGA)
        const {item, todos} = payload
        for (const item of todos) {
            const response = yield axios.put(`/todo/${item.id}`, {...item, isCompleted: true}).catch((err) => {
                    console.log("TickAll Fail: ", err);
                })
                    yield put({type: TYPE_ACTION.TODO.UNCOMPLETED_ALL, payload:{}})
                }
            }
}
export {
    WatchGetTodosSaga,
    WatchAddTodoSaga,
    WatchRemoveTodo,
}