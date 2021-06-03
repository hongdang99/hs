import {
  call,
  put,
  take,
  takeEvery,
  fork,
  select,
  delay,
  takeLatest,
} from "redux-saga/effects";
import {
  add,
  complete,
  get,
  remove,
  turnCompletedAll,
  unCompletedAll,
  update,
  deleteAllTodoCompleted,
} from "../actions";
import TYPE_ACTION from "../actions/TypeAction";
import { axios } from "../axios";

//----Worker
function* doGetTodosSaga() {
  const response = yield axios.get("/todo").catch((err) => {
    console.log("Error:", err);
  });
  yield put(get({ data: response.data }));
}

function* doAddTodoSaga(action) {
  console.log("action:", action.payload); // See Log
  const response = yield axios.post("/todo", action.payload).catch((err) => {
    console.log("Error: ", err);
  });

  yield put(add(response.data));
  alert("Done");
}

function* doHandleUpdate(action) {
  const { value, callBackUpdate, itemEdit } = action.payload;
  yield axios
    .put(`/todo/${itemEdit.id}`, { ...itemEdit, text: value })
    .catch((err) => {
      console.log("Error deleting: ", err);
    });
  yield put(update({ itemEdit, text: value }));
  yield callBackUpdate();
}

function* doRemoveTodo(action) {
  const { id, index } = action.payload;
  const response = yield axios.delete(`/todo/${id}`).catch((err) => {
    console.log("Error: ", err);
  });
  yield put(remove({ id, index }));
}

function* doCompleteTodo(action) {
  const { todo } = action.payload;
  const response = yield axios
    .put(`/todo/${todo.id}`, { ...todo, isCompleted: true })
    .catch((err) => {
      console.log("Error Decorated: ", err);
    });
  yield put(complete(response.data));
}

function* doRemoveCompletedAll() {
  const todos = yield select((state) => state.todos);
  for (const item of todos) {
    item.isCompleted = false;
  }
  yield put(unCompletedAll([...todos]));
}

function* doTurnCompletedAllAPI() {
  const todos = yield select((state) => state.todos);
  for (const item of todos) {
    yield axios.put(`/todo/${item.id}`, { ...item }).catch((err) => {
      console.log("TickAll Fail: ", err);
    });
  }
}

function* doRemoveCompletedAllAPI() {
  const todos = yield select((state) => state.todos);
  for (const item of todos) {
    yield axios.put(`/todo/${item.id}`, { ...item }).catch((err) => {
      console.log("RemoveAll Fail: ", err);
    });
  }
}

function* doTurnCompletedAll() {
  const todos = yield select((state) => state.todos);
  for (const item of todos) {
    {
      item.isCompleted = true;
    }
  }
  yield put(turnCompletedAll([...todos]));
}

function* doRemoveAllToDoCompleted() {
  const todos = yield select((state) => state.todos);
  for (const item of todos) {
    if (item.isCompleted === true) {
      yield axios.delete(`/todo/${item.id}`).catch((err) => {
        console.log("RemoveAll Fail: ", err);
      });
    }
  }
  const tempDelete = todos.filter((num) => !num.isCompleted);
  yield put(deleteAllTodoCompleted(tempDelete));
}

//----Watcher
function* watchGetTodosSaga() {
  // while (true) {
  // const abc = yield take(TYPE_ACTION.TODO.GET_SAGA)
  // const abc = yield take(TYPE_ACTION.TODO.GET_SAGA)
  // yield fork(doGetTodosSaga, abc)
  // }
  yield takeEvery(TYPE_ACTION.TODO.GET_SAGA, doGetTodosSaga);
}

function* watchAddTodoSaga() {
  //     while(true){
  //         const takeAction = yield take(TYPE_ACTION.TODO.POST_SAGA);
  //         const {data} = takeAction;
  //         const response = yield axios.post("/todo", data).catch((err) => {
  //             console.log("Error: ", err);
  //         });
  //         yield put({type: TYPE_ACTION.TODO.POST, payload: { data: response.data}})
  //     }
  yield takeEvery(TYPE_ACTION.TODO.POST_SAGA, doAddTodoSaga);
}

function* watchRemoveTodo() {
  // while (true) {
  //     const { payload} = yield take(TYPE_ACTION.TODO.DELETE_SAGA)
  //     const {id, index} = payload
  //     const response = yield axios.delete(`/todo/${id}`).catch((err) => {
  //         console.log("Error deleting: ", err);
  //     });
  //     yield put({type: TYPE_ACTION.TODO.DELETE, payload: {index}})
  // }
  yield takeEvery(TYPE_ACTION.TODO.DELETE_SAGA, doRemoveTodo);
}

function* watchHandleUpdate() {
  yield takeEvery(TYPE_ACTION.TODO.UPDATE_SAGA, doHandleUpdate);
}

function* watchCompleteTodo() {
  yield takeEvery(TYPE_ACTION.TODO.COMPLETE_TODO_SAGA, doCompleteTodo);
}

function* watchRemoveCompletedAll() {
  yield takeEvery(TYPE_ACTION.TODO.UNCOMPLETED_ALL_SAGA, doRemoveCompletedAll);
}

function* watchRemoveCompletedAllCallAPI() {
  yield takeEvery(
    TYPE_ACTION.TODO.UNCOMPLETED_ALL_SAGA,
    doRemoveCompletedAllAPI
  );
}

function* watchTurnCompletedAll() {
  yield takeEvery(TYPE_ACTION.TODO.TURN_COMPLETED_ALL_SAGA, doTurnCompletedAll);
}

function* watchTurnCompletedAllCallAPI() {
  yield takeLatest(
    TYPE_ACTION.TODO.TURN_COMPLETED_ALL_SAGA,
    doTurnCompletedAllAPI
  );
}

function* watchRemoveAllToDoCompleted() {
  yield takeEvery(
    TYPE_ACTION.TODO.DELETE_ALL_TODO_COMPLETED_SAGA,
    doRemoveAllToDoCompleted
  );
}

export {
  watchGetTodosSaga,
  watchAddTodoSaga,
  watchRemoveTodo,
  watchHandleUpdate,
  watchCompleteTodo,
  watchRemoveCompletedAll,
  watchTurnCompletedAll,
  watchRemoveAllToDoCompleted,
  watchTurnCompletedAllCallAPI,
  watchRemoveCompletedAllCallAPI,
};
