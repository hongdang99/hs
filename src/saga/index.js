// saga effects
import { all } from "redux-saga/effects";

// saga
import { WatchGetTodosSaga, WatchAddTodoSaga, WatchRemoveTodo } from "./todoSaga";

export default function* rootSaga() {
    yield all([WatchGetTodosSaga(), WatchAddTodoSaga(), WatchRemoveTodo()]);
}
