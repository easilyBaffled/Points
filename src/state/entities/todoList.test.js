import reducer, { actors, actions } from "./taskList";
describe("actions", () => {
  describe("addTodo", () => {
    test("empty payload", () => {});
    test("empty state", () => {});
    test("call and call again", () => {});
    test("expects state to be an array", () => {
      expect(() => actors.addTodo({ text: "" })({ 0: "" })).toThrow();
    });
  });
  describe("toggleTodo", () => {});
});
