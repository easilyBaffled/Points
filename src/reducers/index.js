import { combineReducers } from "redux";
import todoList from "../state/entities/todoList";
import viewFilters from "../state/entities/viewFilters";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

const todoApp = combineReducers({
  todos: todoList,
  // todos,
  visibilityFilter: viewFilters
});

export default todoApp;
