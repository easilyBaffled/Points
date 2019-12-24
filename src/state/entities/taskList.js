import { curry } from "ramda";
import {
  createActions,
  createReducer,
  r,
  standardObjectActions
} from "./../util";
import { actors as taskActors } from "./task";

const initialState = [];

export const actors = {
  addTodo: ({ text = r`todo text`, value = 1 }) => collection => {
    const task = taskActors.create({ text, value })();

    return {
      ...collection,
      [task.id]: task
    };
  },
  toggleComplete: id =>
    standardObjectActions.update(
      { id },
      task => taskActors.toggleComplete(task)() // All actors have the signature `payload => state => result` so that they can be used as a reducer function
    )
};

export const actions = createActions(actors);
export default createReducer(actors, initialState);

export const getTaskList = s => s.tasks;
export const getTask = curry((id, s) =>
  standardObjectActions.get({ id }, getTaskList(s))
);
