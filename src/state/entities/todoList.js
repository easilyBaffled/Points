import * as R from "ramda";
import {
  createActions,
  createReducer,
  r,
  standardArrayActions
} from "./../util";
import { actors as taskActors } from "./task";
const todoById = id => list => console.tap(list).find(t => t.id === id);
const todoIndexById = id => list => list.findIndex(t => t.id === id);

const toggleCompleted = t => ({ ...t, completed: !t.completed });

const initialState = [];

export const actors = {
  addTodo: ({ text = r`todo text`, value = 1 }) => list =>
    list.concat(taskActors.create({ text, value })()),
  toggleTodo: id =>
    standardArrayActions.update(
      { id },
      task => taskActors.toggleComplete(task)() // All actors have the signature `payload => state => result` so that they can be used as a reducer function
    )
};

export const actions = createActions(actors);
export default createReducer(actors, initialState);

export const getList = s => s.list;
export const getTodo = id => R.view(todoById(id));
