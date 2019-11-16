import {
  createActions,
  createReducer,
  r,
  standardArrayActions
} from "./../util";
import { actors as taskActors } from "./task";

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

export const getTaskList = s => s.todos;
export const getTask = id => s =>
  standardArrayActions.get({ id }, getTaskList(s));
