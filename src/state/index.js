import { combineReducers } from "redux";
import taskList from "../state/entities/taskList";
import viewFilters from "../state/entities/viewFilters";
import rewards from "../state/entities/rewardList";
import bank from "../state/entities/bank";
import { save as saveState } from "../dataConnection";
import createUpdateCommand from "./createUpdateCommand";
const todoApp = (state, action) => {
  if (action.type === "loadSaveDated") return { ...state, ...action.payload };
  try {
    const newState = combineReducers({
      tasks: taskList,
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
setTimeout(() => {
  const actions = [
    {
      tasks: {}
    },
    {
      tasks: {
        "0": {
          completed: false,
          value: 1,
          id: 0,
          text: "a"
        }
      }
    }
    // {
    //   tasks: {
    //     "0": {
    //       completed: true,
    //       value: 1,
    //       id: 0,
    //       text: "a"
    //     }
    //   }
    // }
  ]
    .map((s, i, ss) => {
      if (i + 1 === ss.length) return null;
      return createUpdateCommand(s, ss[i + 1]);
    })
    .filter(v => v);
  console.log(actions);
  Promise.all(actions).then(p => console.log(p));
}, 1000);
