import { curry } from "ramda";
import { createActions, r } from "./../util";
import { getTask } from "./taskList";
import { getValue, isCompleted } from "./task";

export const initialState = { value: 0 };

export const actors = {
  buyReward: value => state => ({ value: getBankValue(state) - value }),
  toggleComplete: id => state => {
    const task = getTask(id, state);
    const value = getValue(task);

    const bankValue = getBankValue(state);

    return { value: isCompleted(task) ? bankValue + value : bankValue - value };
  }
};

export const actions = createActions(actors);
export default (state, { type = r`type`, payload } = r`action object`) =>
  type in actors ? actors[type](payload)(state) : state.bank || initialState;

export const getBankValue = state => state.bank.value;
export const canAfford = curry((value, state) => getBankValue(state) > value);
