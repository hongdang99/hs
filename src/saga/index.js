// saga effects
import { all } from "redux-saga/effects";

// saga
import {
    watchGetTodosSaga,
    watchAddTodoSaga,
    watchRemoveTodo,
    watchHandleUpdate,
    watchCompleteTodo,
    watchRemoveCompletedAll,
    watchTurnCompletedAll,
    watchRemoveAllToDoCompleted,
    watchRemoveCompletedAllCallAPI,
    watchTurnCompletedAllCallAPI,
} from "./todoSaga";

export default function* rootSaga() {
    yield all([
        watchGetTodosSaga(),
        watchAddTodoSaga(),
        watchRemoveTodo(),
        watchHandleUpdate(),
        watchCompleteTodo(),
        watchRemoveCompletedAll(),
        watchTurnCompletedAll(),
        watchRemoveAllToDoCompleted(),
        watchRemoveCompletedAllCallAPI(),
        watchTurnCompletedAllCallAPI(),
    ]);
}
