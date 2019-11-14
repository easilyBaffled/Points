import { useDispatch } from "react-redux";
import { curry } from "ramda";
const required = ([name] = [""]) => {
  throw new Error(`${name || "value"} is required.`);
};
export const r = required;
/**
 * A function that assumes only one value in the matching object will be true.
 * Calls last value in an object where key is true.
 *
 * @param {Object.<string, function>} obj
 * @param {*} payload - Optional payload to include in the matching function
 * @returns {*}
 *
 * @example
 * const test = payload =>
 *  match({
 *      true: () => payload,
 *      [payload.length === 0]: () => undefined,
 *      [payload.length === 1]: () => payload[0]
 *  })
 */
export const match = (obj = r`matcher object`, ...payload) => {
  if (!obj || typeof obj !== "object" || Array.isArray(obj))
    throw new Error("Match requires an object");
  if (obj[true] === undefined) return obj.default || obj._ || null;
  if (typeof obj[true] === "function") return obj[true](...payload);
  return obj[true];
};

/**
 *
 * @param payload
 * @returns {*}
 */
const payloadUnpacker = payload =>
  match({
    true: payload,
    [payload.length === 0]: () => undefined,
    [payload.length === 1]: () => payload[0]
  });

/**
 * Actor functions expect an exact payload and then state.
 * Actions fired from the interface take the shape { type: string, payload: object }
 * This function takes on object of actors and converts them into actions ready for use with Redux.
 * @param updaters
 * @returns {{}}
 */
export const createActions = updaters =>
  Object.keys(updaters).reduce(
    (acc, type) => ({
      ...acc,
      [type]: (...payload) => ({
        type,
        payload: payloadUnpacker(payload)
      })
    }),
    {}
  );

export const createReducer = (actors = r`actors`, initialState = {}) => (
  state = initialState,
  { type = r`type`, payload } = r`action object`
) => {
  try {
    return type in actors ? actors[type](payload)(state) : state;
  } catch (e) {
    e.message = JSON.stringify(
      { type, payload, state, ErrorMessage: e.message },
      null,
      4
    );
    throw e;
  }
};

export const useEntityDispatch = entityId => {
  const dispatch = useDispatch();
  return action => {
    dispatch({ id: entityId, ...action });
  };
};

const findIndex = (target, arr) =>
  match({
    [Number.isInteger(target)]: target,
    [typeof target === "function"]: () => arr.findIndex(target),
    [typeof target === "object"]: () =>
      arr.findIndex(entry => entry === { ...entry, ...target })
  });

export const applyCurry = obj =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      typeof v === "function" ? curry(v) : v
    ])
  );

export const standardArrayActions = applyCurry({
  get: (find, arr) => arr[findIndex(find, arr)],
  add: (entry, arr) => arr.concat(entry),
  set: (find, value) => standardArrayActions.update(find, () => value),
  update: (find, updater, arr) => {
    const index = findIndex(find, arr);
    return [].concat(
      arr.slice(0, index),
      updater(arr[index]),
      arr.slice(index + 1)
    );
  },
  remove: (find, arr) => {
    const index = findIndex(find, arr);
    return [].concat(arr.slice(0, index), arr.slice(index + 1));
  }
});

export const standardObjectActions = applyCurry({
  set: (payload, e) => ({ ...e, ...payload }),
  update: (func, e) => func(e),
  updateProp: (name, func, e) => ({ ...e, [name]: func(e[name]) }),
  toggle: name => standardObjectActions.updateProp(name, v => !v)
});
