import { combineReducers } from "redux";
import todoList from "../state/entities/todoList";
import viewFilters from "../state/entities/viewFilters";
import rewards from "../state/entities/rewardList";
import bank from "../state/entities/bank";
import { save as saveState } from "../dataConnection";
const todoApp = (state, action) => {
  if (action.type === "loadSaveDated") return { ...state, ...action.payload };
  try {
    const newState = combineReducers({
      todos: todoList,
      visibilityFilter: viewFilters,
      rewards
    })(state, action);

    const resultingState = {
      ...newState,
      bank: bank({ ...state, ...newState }, action)
    };
    if (!/INIT/.test(action.type)) saveState(resultingState);

    return resultingState;
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
