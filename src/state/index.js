import { combineReducers } from "redux";
import todoList from "../state/entities/todoList";
import viewFilters from "../state/entities/viewFilters";
import rewards from "../state/entities/rewardList";
import bank from "../state/entities/bank";

const todoApp = (state, action) => {
  try {
    const newState = combineReducers({
      todos: todoList,
      visibilityFilter: viewFilters,
      rewards
    })(state, action);

    return {
      ...newState,
      bank: console.tap(bank(newState, action))
    };
  } catch (e) {
    e.message = JSON.stringify(
      { state, action, ErrorMessage: e.message },
      null,
      4
    );
    throw e;
  }
};

export default todoApp;
