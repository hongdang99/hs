import { createSelector } from "reselect";
import TYPE_STATUS from "../util/Type_Status";

export const selectTodo = createSelector(
  (state) => state["todos"],
  (todos) => todos
);
export const selectStatus = createSelector(
  (state, status) => status,
  (status) => status
);
export const getFilterByStatus = createSelector(
  [selectStatus, selectTodo],
  (status, todos) => {
    switch (status) {
      case TYPE_STATUS.Active:
        return todos.filter((item) => item.isCompleted === false);
      case TYPE_STATUS.Completed:
        return todos.filter((item) => item.isCompleted === true);
      default:
        return todos;
    }
  }
);
