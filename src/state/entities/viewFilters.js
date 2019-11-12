import { createActions, createReducer } from "./../util";

const states = {
  all: "SHOW_ALL",
  done: "SHOW_COMPLETED",
  active: "SHOW_ACTIVE"
};

const initialState = states.all;

export const actors = {
  setViewFilter: filterType => () => filterType,
  setAll: () => actors.setViewFilter(states.all),
  setDone: () => actors.setViewFilter(states.done),
  setActive: () => actors.setViewFilter(states.active)
};

export const actions = createActions(actors);
export default createReducer(actors, initialState);
