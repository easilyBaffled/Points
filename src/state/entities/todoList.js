import uuid from "uuid/v1";
import * as R from "ramda";
import { createActions, createReducer, r } from "./../util";
const todoById = id => list => console.tap(list).find(t => t.id === id);
const todoIndexById = id => list => list.findIndex(t => t.id === id);

const toggleCompleted = t => ({ ...t, completed: !t.completed });

const initialState = [];

export const actors = {
  addTodo: ({ text = r`todo text`, value = 1 }) => list =>
    list.concat({
      id: uuid(),
      text,
      value,
      completed: false
    }),
  toggleTodo: id => list =>
    Object.values({
      ...list,
      [todoIndexById(id)(list)]: toggleCompleted(
        console.tap(todoById(id)(list))
      )
    })
};

export const actions = createActions(actors);
export default createReducer(actors, initialState);

export const getList = s => s.list;
export const getTodo = id => R.view(todoById(id));
