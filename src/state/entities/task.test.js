import reducer, { actors, initialState } from "./task";

const initialShape = expect.objectContaining({
  completed: expect.any(Boolean),
  value: expect.any(Number)
});

const taskShape = expect.objectContaining({
  completed: expect.any(Boolean),
  value: expect.any(Number),
  id: expect.any(String),
  text: expect.any(String)
});

describe("Task Entity", () => {
  describe("Actors", () => {
    test("create", () => {
      const actual = actors.create({ text: "test todo" })();
      const expected = taskShape;
      expect(actual).toEqual(expected);
    });
    describe("toggleComplete", () => {
      test("returns a task", () => {
        const newTask = actors.create({ text: "test todo" })();
        const actual = actors.toggleComplete(newTask)();
        const expected = taskShape;
        expect(actual).toEqual(expected);
      });
      test("flips `completed`", () => {
        const newTask = actors.create({ text: "test todo" })();
        const actual = actors.toggleComplete(newTask)().completed;
        const expected = true;
        expect(actual).toEqual(expected);
      });
    });
  });
  describe("Reducer", () => {
    test("returns initial state", () => {
      const actual = reducer(initialState, { type: "test" });
      const expected = initialShape;
      expect(actual).toEqual(expected);
    });
    test("action:create", () => {
      const actual = reducer(initialState, {
        type: "create",
        payload: { text: "" }
      });
      const expected = taskShape;
      expect(actual).toEqual(expected);
    });
    test("action:toggleComplete", () => {
      const newTask = actors.create({ text: "test todo" })();
      const actual = reducer(initialState, {
        type: "toggleComplete",
        payload: newTask
      });
      const expected = taskShape;
      expect(actual).toEqual(expected);
    });
  });
});
