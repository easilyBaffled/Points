import "console.tap/dist-src/polyfill.js";
import { match, createActions, createReducer } from "./util";

describe("match", () => {
  describe("should throw an error if the first value is not an object", () => {
    it("empty", () => {
      expect(match).toThrow();
    });
    it("array", () => {
      expect(() => match([])).toThrow();
    });
    it("non-object", () => {
      expect(() => match(Symbol.for("err"))).toThrow();
    });
  });
  describe("default", () => {
    it("will use any value that is true", () => {
      const expected = 1;
      const actual = match({ true: 1 });
      expect(actual).toEqual(expected);
    });
    it("if there is no `true`, it will use they key `default`", () => {
      const expected = 1;
      const actual = match({ default: 1 });
      expect(actual).toEqual(expected);
    });
    it("if there is no `true` or `default`, it will use they key `_`", () => {
      const expected = 1;
      const actual = match({ _: 1 });
      expect(actual).toEqual(expected);
    });
  });
});

const mathActors = {
  add: v => ({ num }) => ({ num: num + v }),
  sub: v => ({ num }) => ({ num: num - v }),
  mult: v => ({ num }) => ({ num: num * v }),
  div: v => ({ num }) => ({ num: num / v })
};

const state = {
  num: 0
};

describe("createActions", () => {
  describe("converts an object of actors to an object of actions", () => {
    it("should have the same keys going in and out", () => {
      const expected = ["add", "sub", "mult", "div"];
      const actual = Object.keys(createActions(mathActors));
      expect(actual).toEqual(expected);
    });
    it("should return an object of functions", () => {
      const expected = ["function", "function", "function", "function"];
      const actual = Object.values(createActions(mathActors)).map(
        f => typeof f
      );
      expect(actual).toEqual(expected);
    });
  });
  describe("Action Functions", () => {
    it("should result in { type: string, payload: * }", () => {
      const expected = [
        { type: "add", payload: 0 },
        { type: "sub", payload: 0 },
        { type: "mult", payload: 0 },
        { type: "div", payload: 0 }
      ];
      const actual = Object.values(createActions(mathActors)).map(f => f(0));
      expect(actual).toEqual(expected);
    });
  });
  it("can take a list of values and turns them into a payload array", () => {
    const expected = { type: "add", payload: [1, 2, 3] };
    const actual = createActions(mathActors).add(1, 2, 3);
    expect(actual).toEqual(expected);
  });
  it("payload will be undefined if nothing is passed in", () => {
    const expected = { type: "add", payload: undefined };
    const actual = createActions(mathActors).add();
    expect(actual).toEqual(expected);
  });
});

describe("createReducer", () => {
  // describe('combines an actor object and state into a reducer function',  )
  it("produces a reducer function", () => {
    const expected = "function";
    const actual = typeof createReducer(mathActors, state);
    expect(actual).toEqual(expected);
  });
  describe("Reducer Function", () => {
    it("matches action type with an actor function to update state", () => {
      const expected = { num: 1 };
      const actual = createReducer(mathActors, state)(state, {
        type: "add",
        payload: 1
      });
      expect(actual).toEqual(expected);
    });
    it("will throw if the action type is not in the list of actors", () => {
      const mathReducer = createReducer(mathActors, state);
      expect(() => mathReducer({ type: "sum", payload: 0 })).toThrow();
    });
  });
});
