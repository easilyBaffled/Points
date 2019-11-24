import { curry } from "ramda";
import { createActions, r } from "./../util";
import { getTask } from "./todoList";
import { getValue, isCompleted } from "./task";

export const initialState = 0;

export const actors = {
  buyReward: value => state => getBankValue(state) - value,
  toggleComplete: id => state => {
    const task = getTask(id, state);
    const value = getValue(task);

    const bankValue = getBankValue(state);

    return isCompleted(task) ? bankValue + value : bankValue - value;
  }
};

export const actions = createActions(actors);
export default (state, { type = r`type`, payload } = r`action object`) =>
  type in actors
    ? actors[type](payload)(state)
    : getBankValue(state) || initialState;

export const getBankValue = state => state.bank;
export const canAfford = curry((value, state) => getBankValue(state) > value);
