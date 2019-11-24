import {
  createActions,
  createReducer,
  r,
  standardArrayActions
} from "./../util";
import { actors as taskActors } from "./task";

const initialState = [];

export const actors = {
  addReward: ({ text = r`todo text`, value = 1 }) => list =>
    list.concat(taskActors.create({ text, value })()),
  deleteReward: id => standardArrayActions.remove({ id }),
  buyReward: id => standardArrayActions.remove({ id })
};

export const actions = createActions(actors);
export default createReducer(actors, initialState);

export const getRewardList = s => console.tap(s).rewards;
export const getReward = id => standardArrayActions.get({ id });
