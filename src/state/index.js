import { combineReducers } from "redux";
import todoList from "../state/entities/todoList";
import viewFilters from "../state/entities/viewFilters";

const todoApp = combineReducers({
  todos: todoList,
  visibilityFilter: viewFilters
});

export default todoApp;
