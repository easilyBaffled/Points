import { combineReducers } from "redux";
import taskList from "../state/entities/taskList";
import viewFilters from "../state/entities/viewFilters";
import rewards from "../state/entities/rewardList";
import bank from "../state/entities/bank";
import { save as saveState } from "../dataConnection";
import createUpdateCommand from "./createUpdateCommand";
import { fromCommand } from "../dataStore";
const todoApp = (state, action) => {
  if (action.type === "loadSaveData") return { ...state, ...action.payload };
  if (action.type === "loadTasks")
    return { ...state, tasks: action.payload || state.tasks };
  if (action.type === "loadBank")
    return { ...state, bank: action.payload.only || state.bank };
  if (action.type === "loadRewards")
    return { ...state, rewards: action.payload || state.rewards };
  try {
    const newState = combineReducers({
      bank: () => {},
      tasks: taskList,
      visibilityFilter: viewFilters,
      rewards
    })(state, action);

    const resultingState = {
      ...newState,
      bank: bank({ ...state, ...newState }, action)
    };
    if (!/INIT/.test(action.type)) {
      createUpdateCommand(state, resultingState)
        .filter(({ path }) => !!path && !path.includes("visibilityFilter"))
        .map(fromCommand);
      saveState(resultingState);
    }

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
