/* Reward */
import uuid from "uuid/v1";
import { createActions, createReducer, r } from "./../util";

export const actors = {
  create: ({ text = r`reward label`, value = r`reward cost` }) => () => ({
    id: uuid(),
    text,
    value: parseInt(value)
  })
};

export const actions = createActions(actors);
export default createReducer(actors, initialState);

export const getId = t => t.id;
export const getText = t => t.text;
export const getValue = t => t.value;
