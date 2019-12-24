import { curry } from "ramda";
import {
  createActions,
  createReducer,
  r,
  standardObjectActions
} from "./../util";
import { actors as taskActors } from "./task";
import { actors as groupActors } from "./group";

const initialState = [];

export const actors = {
  addGroup: ({ text = r`Group Title`, value = 0 }) => collection => {
    const group = groupActors.create({ text, value })();

    return {
      ...collection,
      [group.id]: group
    };
  },
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
